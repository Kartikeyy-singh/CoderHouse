
const { GenerateOTP, SendbySMS, verifyOTPservice } = require("../Services/OTP-service");
const { HashOPT } = require("../Services/hash-service")
const { findUser, createUser } = require("../Services/user-service");
const { GenerateToken } = require("../Services/Token-service");
const UserDto = require('../dtos/user-dtos');
const { storerefreshToken }  = require("../Services/Token-service")

exports.sendOTP = async (req, res) => {
    const { phone } = req.body;
    console.log(phone);
    if (!phone) {
        res.status(400).json({
            message: "Phone number is required"
        });
    }

    const OTP = await GenerateOTP();

    const ttl = 1000 * 60 * 60 * 24;
    const expire = Date.now() + ttl;

    const data = `${phone}.${OTP}.${expire}`;

    const hashedOTP = await HashOPT(data);
    // console.log(hashedOTP);
    try {
        // const smsresponse = await SendbySMS(phone, OTP);
        return res.json({
            hash: `${hashedOTP}.${expire}`,
            OTP:OTP,
            phone: phone
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Message Sending failed"
        })
    }
}


exports.verifyOTP = async (req, res) => {
    const { OTP, hash, phone } = req.body;

    if (!OTP || !hash || !phone) {
        res.status(500).json({
            message: "All field are required"
        })
        return;
    }
    const [hashedOTP, expire] = hash.split('.');
    if (Date.now() > +expire) {
        res.status(400).json({
            message: "OTP duration Expired"
        })
        return;
    }
    const data = `${phone}.${OTP}.${expire}`;
    
    const isValid = verifyOTPservice(hashedOTP, data);
    
    if (!isValid) {
        res.status(400).json({
            message: "Invalid OTP"
        });
        return;
    }
    
    let user;
    try {
        user = await findUser({ phone });
        if (!user) {
            user = await createUser({ phone });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Db error' });
        return;
    }

    const { accessToken, refreshToken } = await GenerateToken({
        _id: user._id,
        activated: false,
    });
    // console.log(accessToken);
    // console.log(refreshToken);

    await storerefreshToken(refreshToken, user._id);

    res.cookie('refreshToken', refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
    });

    res.cookie('accessToken', accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
    });

    const userDto = new UserDto(user);
    res.json({ user: userDto, isAuth: true });
    // res.json({ user: userDto, Auth: true }); Auth or isAuth


}

const { GenerateOTP, SendbySMS, verifyOTPservice } = require("../Services/OTP-service");
const { HashOPT } = require("../Services/hash-service")

exports.sendOTP = async (req, res) => {
    const { phone } = req.body;
    if (!phone) {
        res.status(400).json({
            message: "Phone number is required"
        });
    }
    const OTP = await GenerateOTP();

    const ttl = 1000 * 60 * 2;
    const expire = Date.now() + ttl;

    const data = `${phone}.${OTP}.${expire}`;

    const hashedOTP = await HashOPT(data);
    // console.log(hashedOTP);
    try {
        const smsresponse = await SendbySMS(phone, OTP);
        return res.json({
            hash: `${hashedOTP}.${expire}`,
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
    }
    const [hashedOTP, expire] = hash.split('.');
    if (Date.now() > expire) {
        res.status(400).json({
            message: "OTP duration Expired"
        })
    }
    const data = `${phone}.${OTP}.${expire}`;

    const isValid = verifyOTPservice(hashedOTP, data);

    if (!isValid) {
        res.status(400).json({
            message: "Invalid OTP"
        });
    }

    let user;
    let accessToken;
    let refeshToken;

}
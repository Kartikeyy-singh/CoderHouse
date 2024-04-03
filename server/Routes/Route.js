const router = require('express').Router();
const { sendOTP, verifyOTP } = require("../Controllers/Auth_Controller")

router.post('/api/send-otp', sendOTP);
router.post('/api/verify-otp', verifyOTP);
module.exports = router;

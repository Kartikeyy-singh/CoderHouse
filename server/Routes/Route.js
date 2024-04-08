const router = require('express').Router();
const { sendOTP, verifyOTP } = require("../Controllers/Auth_Controller")
const { activate } = require("../Controllers/Activate_Controller");
const { middle } = require("../middlewares/auth_middleware");

router.post('/api/send-otp', sendOTP);
router.post('/api/verify-otp', verifyOTP);
router.post('/api/activate', middle,activate)
module.exports = router;

// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment, verifySignature } = require("../controller/Payments")
const { tokenverify, isInstructor, isStudent, isAdmin } = require("../middleware/Auth")
router.post("/capturePayment", tokenverify, isStudent, capturePayment)
router.post("/verifySignature", verifySignature)

module.exports = router
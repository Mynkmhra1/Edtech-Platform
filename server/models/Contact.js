const mongoose = require("mongoose");
const mailSender = require("../utils/mailsender"); 
// Define Contact Schema
const ContactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number
    },
    countryCode: {
        type: String
    },
    message: {
        type: String
    }
});

// Function to send verification email
async function sendVerificationMail(body, recipientEmail) {
    try {
        const mailResponse = await mailSender("Someone sent you a query", body, recipientEmail);
        console.log(" Email sent successfully:", mailResponse);
    } catch (err) {
        console.error("Error sending email:", err.message);
    }
}

// Pre-save hook to send verification email
ContactSchema.pre("save", async function (next) {
    try {
        if (this.firstName && this.lastName && this.email && this.phone && this.message) {
            console.log("📩 Sending verification email from:", this.email);

            const body = `The following data is gathered:
            - First Name: ${this.firstName}
            - Last Name: ${this.lastName}
            - Email: ${this.email}
            - Phone: ${this.phone}
            - Country Code: ${this.countryCode}
            - Message: ${this.message}`;

            await sendVerificationMail(body, "mynkmhra200@gmail.com");
            console.log(" Verification email sent successfully.");

        } else {
            console.error(" Missing required fields in pre-save hook");
        }
    } catch (err) {
        console.error(" Error in pre-save hook:", err.message);
        return next(err); // Pass the error to Mongoose for handling
    }
    next();
});

// Export Contact Model
module.exports = mongoose.model("Contact", ContactSchema);

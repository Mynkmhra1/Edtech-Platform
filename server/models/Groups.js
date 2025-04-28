const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }],
    notification: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notification"
    }]
});

module.exports = mongoose.model("Group", GroupSchema);

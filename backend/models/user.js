const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },

    spreadsheetData: {
        spreadsheetId: { type: String },
        sheetId: { type: String },
        sheetName: { type: String }
    },
    formData: {
        step1: [{
            value: { type: String },
            priority: { type: Number, min: 0, max: 10 }
        }],
        step2: {
            type: String
        },
        step3: [{
            value: { type: String },
            priority: { type: Number, min: 0, max: 10 }
        }],
        step4: [{
            value: { type: String },
            priority: { type: Number, min: 0, max: 10 }
        }],
        step5: {
            value1: { type: String },
            value2: { type: String }
        },
        step6: { type: String },
        step7: [{
            label: { type: String },
            value: { type: String }
        }],
        step8: [{
            label: { type: String },
            value: { type: String }
        }],
        step9: { type: String },
        step10: [{
            value: { type: String },
            checked: { type: Boolean }
        }],
        step11: {
            value1: { type: String },
            value2: { type: String }
        },
        step12: { type: String },
        step13: [{ type: String }],
        step14: { type: String },
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

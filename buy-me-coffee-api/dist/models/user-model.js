"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: false,
        default: "",
    },
    role: {
        type: String,
        enum: ["admin", "user"],
    },
    isVerified: {
        type: Boolean,
        required: false,
        default: "",
    },
    createdAt: {
        type: Date,
        required: true,
    },
    updatedAt: {
        type: Date,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
});
exports.userModel = (0, mongoose_1.model)("user", userSchema);
//# sourceMappingURL=user-model.js.map
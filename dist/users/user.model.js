"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = exports.userSchema = void 0;
const mongoose = require("mongoose");
exports.userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    }
});
class UserDto {
}
exports.UserDto = UserDto;
//# sourceMappingURL=user.model.js.map
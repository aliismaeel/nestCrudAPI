"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = exports.userSchema = exports.UserRole = void 0;
const mongoose = require("mongoose");
var UserRole;
(function (UserRole) {
    UserRole["admin"] = "admin";
    UserRole["superAdmin"] = "superAdmin";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
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
    },
    userRole: {
        type: String,
        enum: ['admin', 'superadmin', 'user'],
        default: 'user',
        required: true
    }
});
class UserDto {
}
exports.UserDto = UserDto;
//# sourceMappingURL=user.model.js.map
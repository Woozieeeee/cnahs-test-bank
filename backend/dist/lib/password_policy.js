"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPasswordStrong = isPasswordStrong;
function isPasswordStrong(password) {
    return (password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[^A-Za-z0-9]/.test(password));
}

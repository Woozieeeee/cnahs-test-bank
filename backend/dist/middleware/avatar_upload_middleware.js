"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const avatarUpload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (_req, file, cb) => {
        const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
        if (allowed.includes(file.mimetype)) {
            cb(null, true);
            return;
        }
        cb(new Error("Only JPEG, PNG, WebP, and GIF images are allowed"));
    },
});
exports.default = avatarUpload;

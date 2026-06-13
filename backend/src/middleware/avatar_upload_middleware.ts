import multer from "multer";

const storage = multer.memoryStorage();

const avatarUpload = multer({
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

export default avatarUpload;

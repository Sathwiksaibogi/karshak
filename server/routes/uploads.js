// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// const router = express.Router();

// const uploadsDir = path.resolve('uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadsDir),
//   filename: (req, file, cb) => {
//     const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     const ext = path.extname(file.originalname) || '.jpg';
//     cb(null, unique + ext);
//   },
// });

// const upload = multer({ storage });

// router.post('/', upload.single('image'), (req, res) => {
//   if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
//   const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
//   res.status(201).json({ url: fileUrl, filename: req.file.filename });
// });

// export default router;

// routes/uploads.js

import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const router = express.Router();

// ✅ Configure Cloudinary using your .env variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Configure Multer to use Cloudinary for storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'karshak-products', // This creates a folder named 'karshak-products' in Cloudinary
    allowed_formats: ['jpeg', 'png', 'jpg'], // Restricts file types
  },
});

const upload = multer({ storage });

// ✅ The route logic is now simpler
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Cloudinary provides the secure URL in req.file.path
  res.status(201).json({ url: req.file.path });
});

export default router;
import express from 'express'
import multer from 'multer'
import { addPro, listPro, removePro, getProductsByIds } from '../controllers/controlProduct.js'

const proRouter = express.Router()

// 🖼️ إعداد تخزين الصور - Vercel compatible
const storage = multer.memoryStorage(); // Use memory storage for Vercel

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// 🧩 المسارات
proRouter.post('/add', upload.single('image'), addPro)
proRouter.get('/list', listPro)
proRouter.post('/remove', removePro)
proRouter.get('/byIds', getProductsByIds);

export default proRouter

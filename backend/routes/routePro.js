import express from 'express'
import multer from 'multer'
import { addPro, listPro, removePro ,getProductsByIds} from '../controllers/controlProduct.js'

const proRouter = express.Router()

// 🖼️ إعداد تخزين الصور
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage })

// 🧩 المسارات
proRouter.post('/add', upload.single('image'), addPro)
proRouter.get('/list', listPro)
proRouter.post('/remove', removePro)
proRouter.get('/byIds', getProductsByIds);

export default proRouter

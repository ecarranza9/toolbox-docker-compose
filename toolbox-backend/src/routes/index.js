import express from 'express'
import { getFilesData, getFilesList } from '../controllers/index.js'

const router = express.Router()

router
  .route('/files/data')
  .get(getFilesData)

router
  .route('/files/list')
  .get(getFilesList)

export default router

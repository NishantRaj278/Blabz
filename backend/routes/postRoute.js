import express from 'express'
import { createPost, deletePost, featurePost, getPost, getPosts } from '../controllers/postControllers.js';
import upload from '../config/multer-configuration.js';
import increaseVisit from '../middlewares/increaseVisitCount.js';

const router  = express.Router();

router.get('/', getPosts);
router.get('/:slug', increaseVisit, getPost);
router.post('/', upload.single('img'), createPost);
router.delete('/:id', deletePost);
router.patch('/feature', featurePost);

export default router;
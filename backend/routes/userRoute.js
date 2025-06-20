import express from 'express'
import { getSavedPosts, savedPost } from '../controllers/userController.js';

const router  = express.Router();

router.get('/saved', getSavedPosts);
router.patch('/save', savedPost);

export default router;
import express from 'express'
import { addComment, deleteComment, getComments } from '../controllers/commentController.js';

const router  = express.Router();

router.get('/:postId', getComments);
router.post('/:postId', addComment);
router.delete('/:id', deleteComment);

export default router;
const express = require('express');
const router = express.Router();
const {
    createBlog,
    getAllBlog,
    getBlogById,
    updateBlog,
    deleteBlog,
    toggleLike,
    addComment,
    addReply,
    getComment,
} = require("../controllers/blogController");
const authMiddleware = require("../middleware/authMiddleware");

// pubic routes
router.get('/',getAllBlog);
router.get('/:id',getBlogById);

// private routes
router.post('/',authMiddleware,createBlog);
router.put('/:id',authMiddleware,updateBlog);
router.delete('/:id',authMiddleware,deleteBlog);

// like 
router.post('/:id/like',authMiddleware,toggleLike);
// comment
router.post('/:id/comment',authMiddleware,addComment);
router.get('/:id/comment',getComment)
// replies
router.post('/:blogId/comment/:commentId/reply',authMiddleware,addReply);
// router.get('/:blogId/comment/:commentId/reply',getReply);

module.exports = router;
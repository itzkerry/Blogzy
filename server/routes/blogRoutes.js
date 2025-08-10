// api/blogs
const express = require('express');
const router = express.Router();
const {
    createBlog,
    getAllBlog,
    getBlogById,
    getBlogs,
    updateBlog,
    deleteBlog,
    toggleLike,
    addComment,
    getComment,
    toggleSave,
    getFeedBlog,
} = require("../controllers/blogController");
const authMiddleware = require("../middleware/authMiddleware");
const uploadToCloudinary = require('../middleware/cloudinaryMiddleware');
const upload = require('../middleware/multer.config');

// pubic routes
router.get('/',getAllBlog);

// private routes


router.get('/:id',authMiddleware,getBlogById);
router.post('/my',
    authMiddleware,
    upload.single('coverImage'),
    uploadToCloudinary(),
    createBlog
);
router.get('/my/blog',authMiddleware,getBlogs);
router.put('/my/:id',authMiddleware,
    upload.single('coverImage'),
    uploadToCloudinary(),
    updateBlog
);
router.delete('/my/:id',authMiddleware,deleteBlog);
router.get('/my/feed',authMiddleware,getFeedBlog)

// like & save
router.post('/:id/save',authMiddleware,toggleSave);
router.post('/:id/like',authMiddleware,toggleLike);
// comment
router.post('/:id/comment',authMiddleware,addComment);
router.get('/:id/comment',getComment)
// replies
// router.post('/:blogId/comment/:commentId/reply',authMiddleware,addReply);
// router.get('/:blogId/comment/:commentId/reply',getReply);

module.exports = router;
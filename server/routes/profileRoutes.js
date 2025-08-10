const express = require('express');
const router = express.Router();
const {getProfile , updateBio, updateAvatar, togglefollow} = require('../controllers/profileControllers');
const authMiddleware = require('../middleware/authMiddleware');
const uploadToCloudinary = require('../middleware/cloudinaryMiddleware');
const upload = require('../middleware/multer.config');

router.get('/:username',authMiddleware,getProfile);


router.put('/:id/avatar',authMiddleware,
    upload.single('avatar'),
    uploadToCloudinary(),
    updateAvatar
);

router.put('/:id/bio',authMiddleware,updateBio);

router.put('/:id/toggleFollow',authMiddleware,togglefollow);

module.exports = router;
const express = require('express');
const router = express.Router();
const verifyToken = require('../midlewares/auth');

const Post = require('../models/Post');

// @route Get api/posts
// @des Get post
// @access private
router.get('/', verifyToken, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.userId }).populate('user', [
            'username',
        ]);
        res.json({ success: true, posts });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

// @route Post api/posts
// @des Create post
// @access public

router.post('/', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body;

    if (!title)
        return res
            .status(400)
            .json({ success: false, message: 'Title is required' });
    try {
        const newPost = new Post({
            title,
            description,
            url: url.startsWith('https://') ? url : `https://${url}`,
            status: status || 'To Learn',
            user: req.userId,
        });

        await newPost.save();
        res.json({
            success: true,
            message: 'Post successfully',
            post: newPost,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

// @route Put api/posts
// @des Update post
// @access private

router.put('/:id', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body;
    if (!title)
        return res
            .status(400)
            .json({ success: false, message: 'Title is required' });
    try {
        let updatedPost = {
            title,
            description: description || '',
            url: (url.startsWith('https://') ? url : `https://${url}`) || '',
            status: status || 'To Learn',
        };

        updatedPost = await Post.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.userId,
            },
            updatedPost,
            { new: true }
        );

        // User not authorised to update post
        if (!updatedPost)
            return res.status(401).json({
                success: false,
                message: 'Post not found or use not autherised',
            });
        res.json({
            success: true,
            message: 'Update successfully',
            post: updatedPost,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});
// @route DELETE api/posts
// @des Delete post
// @access private

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const deletedPost = await Post.findOneAndDelete({
            _id: req.params.id,
            user: req.userId,
        });
        // User not autherised or post not found
        if (!deletedPost)
            return res.status(401).json({
                success: false,
                message: 'Post not found or use not autherised',
            });
        res.json({
            success: true,
            message: 'Update successfully',
            post: deletedPost,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});
module.exports = router;

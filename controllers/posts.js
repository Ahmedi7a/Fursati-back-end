const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const Post = require('../models/post.js');
const router = express.Router();

// ========== Public Routes ===========

// ========= Protected Routes =========



//anything bellow this the user has to sign in
router.use(verifyToken);

 router.post('/', async (req, res) => {
    try {
      req.body.author = req.user._id;
      const hoot = await Post.create(req.body);
      hoot._doc.author = req.user;
      res.status(201).json(post);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
});


router.get('/', async (req, res) => {
    try {
      const hoots = await Post.find({})
        .populate('author')
        .sort({ createdAt: 'desc' });
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json(error);
    }
  });


 


//show details
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId).populate(['author', 'comments.author']);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
});

//update
router.put('/:postId', async (req, res) => {
    try {
        // Find the post:
        const post = await Post.findById(req.params.postId);

        // Check permissions:
        if (!post.author.equals(req.user._id)) {
            return res.status(403).send("You're not allowed to do that!");
        }

        // Update post:
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId,
            req.body,
            { new: true }
        );

        // Append req.user to the author property:
        updatedPost._doc.author = req.user;

        // Issue JSON response:
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json(error);
    }
});

//delete post
router.delete('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);

        if (!post.author.equals(req.user._id)) {
            return res.status(403).send("You're not allowed to do that!");
        }

        const deletedPost = await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json(deletedPost);
    } catch (error) {
        res.status(500).json(error);
    }
});

//=================================================================
//post comments
router.post('/:postId/comments', async (req, res) => {
    try {
        req.body.author = req.user._id;
        const post = await Post.findById(req.params.postId);
        post.comments.push(req.body);
        await post.save();

        // Find the newly created comment:
        const newComment = post.comments[post.comments.length - 1];

        newComment._doc.author = req.user;

        // Respond with the newComment:
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json(error);
    }
});






module.exports = router;






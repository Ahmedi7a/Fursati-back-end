const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const Post = require('../models/post.js');
const router = express.Router();

// ========== Public Routes ===========

// ========= Protected Routes =========



//anything bellow this the user has to sign in
router.use(verifyToken);


router.get('/', async (req, res) => {
    try {
      const hoots = await Post.find({})
        .populate('author')
        .sort({ createdAt: 'desc' });
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  });


  router.get('/:postId', async (req, res) => {
    try {
      const hoot = await Post.findById(req.params.hootId).populate('author');
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  });



  router.post('/', async (req, res) => {
    try {
      req.body.author = req.user._id;
      const post = await Post.create(req.body);
      hoot._doc.author = req.user;
      res.status(201).json(hoot);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });

  router.post('/:postId/comments', async (req, res) => {
    try {
      req.body.author = req.user._id;
      const hoot = await Hoot.findById(req.params.hootId);
      hoot.comments.push(req.body);
      await hoot.save();



  
      // Find the newly created comment:
 const newComment = hoot.comments[hoot.comments.length - 1];
  
      newComment._doc.author = req.user;
  
      // Respond with the newComment:
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json(error);
    }
  });


module.exports = router;






const mongoose = require('mongoose');

// models/hoot.js
const commentSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true
        },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    },
    { timestamps: true }
);

const postSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        about: {
            type: String,
            required: true,
        },
        education: {
            type: String,
            required: true,
            enum: ["High School", "Deploma Degree", "Bachelor's Degree", "Master's Degree", "Doctorate (PhD)"],
        },
        role: {
            type: String,
            required: true,
            enum: ["Software Development", "Networking", "Security", "Technician",],
        },
        experience: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ["Employed", "Unemployed"],
        },
        nationality: {
            type: String,
            required: true,
            enum: ["Bahraini", "Foreigner"],
        },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        comments: [commentSchema]
    },
    { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
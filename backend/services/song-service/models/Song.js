const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    artist: {
        type: String,
        required: true
    },

    album: {
        type: String,
        default: ""
    },

    genre: {
        type: String,
        default: ""
    },

    lyrics: {
        type: String,
        default: ""
    },

    duration: {
        type: String,
        default: ""
    },

    audioUrl: {
        type: String,
        default: ""
    },

    thumbnail: {
        type: String,
        default: ""
    },

    views: {
        type: Number,
        default: 0
    },

    likes: {
        type: Number,
        default: 0
    },

    likedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    isFeatured: {
        type: Boolean,
        default: false
    },

    isTrending: {
        type: Boolean,
        default: false
    },

    releaseDate: {
        type: Date,
        default: Date.now
    },
    audioUrl: {
        type: String,
        default: ""
    },

    thumbnail: {
        type: String,
        default: ""
    },

},
    {
        timestamps: true
    });

module.exports = mongoose.model(
    "Song",
    songSchema
);
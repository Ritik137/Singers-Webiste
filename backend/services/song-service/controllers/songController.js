const Song = require("../models/Song.js");

// Add Song
exports.addSong = async (req, res) => {

    try {

        const {
            title,
            artist,
            album,
            genre,
            lyrics
        } = req.body;

        const audioFile =
            req.files["audio"]
                ? req.files["audio"][0].path
                : "";

        const thumbnail =
            req.files["thumbnail"]
                ? req.files["thumbnail"][0].path
                : "";

        const song = await Song.create({

            title,
            artist,
            album,
            genre,
            lyrics,
            audioUrl: audioFile,
            thumbnail

        });

        res.status(201).json({

            success: true,
            song

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,
            msg: err.message

        });

    }

};


// Get All Songs
exports.getAllSongs = async (req, res) => {

    try {

        const songs =
            await Song.find()
                .sort({ createdAt: -1 });

        res.status(200).json({

            success: true,
            songs

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,
            msg: err.message

        });

    }

};


// Get Song By Id
exports.getSongById = async (req, res) => {

    try {

        const song =
            await Song.findById(
                req.params.id
            );

        if (!song) {

            return res.status(404).json({

                success: false,
                msg: "Song not found"

            });

        }

        res.status(200).json({

            success: true,
            song

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,
            msg: err.message

        });

    }

};


// Update Song
exports.updateSong = async (req, res) => {

    try {

        const song =
            await Song.findByIdAndUpdate(

                req.params.id,
                req.body,
                { new: true }

            );

        res.status(200).json({

            success: true,
            song

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,
            msg: err.message

        });

    }

};


// Delete Song
exports.deleteSong = async (req, res) => {

    try {

        await Song.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({

            success: true,
            msg: "Song deleted"

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,
            msg: err.message

        });

    }

};


// Featured Songs
exports.getFeaturedSongs = async (req, res) => {

    try {

        const songs =
            await Song.find({

                isFeatured: true

            });

        res.status(200).json({

            success: true,
            songs

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,
            msg: err.message

        });

    }

};


// Trending Songs
exports.getTrendingSongs = async (req, res) => {

    try {

        const songs =
            await Song.find({

                isTrending: true

            });

        res.status(200).json({

            success: true,
            songs

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,
            msg: err.message

        });

    }

};


// Search Songs
exports.searchSongs = async (req, res) => {

    try {

        const keyword =
            req.query.q;

        const songs =
            await Song.find({

                $or: [

                    {
                        title: {
                            $regex: keyword,
                            $options: "i"
                        }
                    },

                    {
                        artist: {
                            $regex: keyword,
                            $options: "i"
                        }
                    },

                    {
                        album: {
                            $regex: keyword,
                            $options: "i"
                        }
                    }

                ]

            });

        res.status(200).json({

            success: true,
            songs

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,
            msg: err.message

        });

    }

};


// Increment Views
exports.incrementViews = async (req, res) => {

    try {

        const song =
            await Song.findByIdAndUpdate(

                req.params.id,

                {

                    $inc: {

                        views: 1

                    }

                },

                {

                    new: true

                }

            );

        res.status(200).json({

            success: true,
            song

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,
            msg: err.message

        });

    }

};


// Like Song
exports.likeSong = async (req, res) => {

    try {

        const song =
            await Song.findByIdAndUpdate(

                req.params.id,

                {

                    $inc: {

                        likes: 1

                    }

                },

                {

                    new: true

                }

            );

        res.status(200).json({

            success: true,
            song

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,
            msg: err.message

        });

    }

};

exports.toggleLikeSong = async (req, res) => {

    try {

        const song =
            await Song.findById(
                req.params.id
            );

        const userId =
            req.user.id;

        const isLiked =
            song.likedBy.includes(
                userId
            );

        if (isLiked) {

            song.likedBy.pull(
                userId
            );

            song.likes--;

        }

        else {

            song.likedBy.push(
                userId
            );

            song.likes++;

        }

        await song.save();

        res.status(200).json({

            success: true,

            song

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            msg: err.message

        });

    }

};


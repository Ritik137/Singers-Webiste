const express = require("express");

const { addSong, getAllSongs, getSongById, updateSong, deleteSong, getFeaturedSongs, getTrendingSongs, searchSongs, incrementViews, likeSong, toggleLikeSong } = require("../controllers/songController");
const upload = require("../middleware/upload");
const { verifyToken } = require("../middleware/authMiddleware");

const { isAdmin } = require("../middleware/isAdmin");

const router = express.Router();

router.post("/add-song", verifyToken, isAdmin, upload.fields([{ name: "audio", maxCount: 1 }, { name: "thumbnail", maxCount: 1 }]), addSong);

router.get("/get-all-song", getAllSongs);

router.get("/get-song/:id", getSongById);

router.put("/update-song/:id", verifyToken, isAdmin, updateSong);

router.delete("/delete-song/:id", verifyToken, isAdmin, deleteSong);

router.get("/featured", getFeaturedSongs);

router.get("/trending", getTrendingSongs);

router.get("/search", searchSongs);

router.put("/views/:id", incrementViews);

router.put("/like/:id", likeSong);

router.put("/like/:id", verifyToken, toggleLikeSong);

module.exports = router;
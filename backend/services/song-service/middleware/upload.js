const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {

        if (file.fieldname === "audio") {

            return {
                folder: "songs/audio",
                resource_type: "video"
            };

        }

        return {
            folder: "songs/thumbnails",
            allowed_formats: ["jpg", "jpeg", "png"]
        };

    }
});

module.exports = multer({
    storage
});
const multer = require("multer");

const {
    CloudinaryStorage
} = require("multer-storage-cloudinary");

const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({

    cloudinary,

    params: async (req, file) => {

        return {

            folder: "profile-pictures",

            resource_type: "auto",

            allowed_formats: [
                "jpg",
                "jpeg",
                "png",
                "webp",
                "gif",
                "bmp",
                "svg"
            ]

        };

    }

});

module.exports = multer({
    storage
});
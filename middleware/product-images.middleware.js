require("dotenv").config();
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

const { uploadMultipleImages } = require("./upload-image.middleware");

const path = require('path')

const uploadProductImages = uploadMultipleImages(['images','images']);

const resizeImages = async (req, res, next) => {
    const filename = `user-profile-${uuidv4()}.png`;

    console.log(req.file);

    if (req.file) {
        const filePath = path.join(__dirname, '../images/product-images/');
        await sharp(req.file.buffer)
            .resize(500, 500)
            .toFormat("png")
            .png({ quality: 95 })
            .toFile(filePath + filename);

        req.body.imagePath = process.env.IMAGEURL + '/images/product-images/' + filename;// Use the relative path to the image
        console.log(req.body);
    }

    next();
};

module.exports = { resizeImages, uploadProductImages };
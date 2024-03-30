const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

const { uploadMultipleImages } = require("./upload-image.middleware");

const path = require('path')

const uploadProductImages = uploadMultipleImages("images");

const resizeImage = async (req, res, next) => {
    const filename = `product-${uuidv4()}.png`;

    if (req.file) {
        const filePath = path.join(__dirname, '../images/products/'); 
        await sharp(req.file.buffer)
            .resize(600, 600)
            .toFormat("png")
            .png({ quality: 95 })
            .toFile(filePath + filename);
    }

    next();
};

module.exports = { resizeImage, uploadProductImages };
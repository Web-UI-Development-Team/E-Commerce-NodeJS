require("dotenv").config();
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

const { uploadSingleImage } = require("./upload-image.middleware");

const path = require('path')

const uploadCatIcon = uploadSingleImage("icon");

const resizeImage = async (req, res, next) => {
    const filename = `user-profile-${uuidv4()}.png`;
    
    console.log(req.file);

    if (req.file) {
        const filePath = path.join(__dirname, '../images/cat-icon/');
        await sharp(req.file.buffer)
            .resize(1000, 1000)
            .toFormat("png")
            .png({ quality: 95 })
            .toFile(filePath + filename);

        req.body.icon = process.env.IMAGEURL + '/images/cat-icon/' + filename;// Use the relative path to the image
        console.log(req.body);
    }

    next();
};

module.exports = { resizeImage, uploadCatIcon };
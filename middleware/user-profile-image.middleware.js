require("dotenv").config();
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

const { uploadSingleImage } = require("./upload-image.middleware");

const path = require('path')

const uploadUserImage = uploadSingleImage("image");

const resizeImage = async (req, res, next) => {
    const filename = `user-profile-${uuidv4()}.png`;

    if (req.file) {
        const filePath = path.join(__dirname, '../images/user-profile/'); 
        await sharp(req.file.buffer)
            .resize(500, 500)
            .toFormat("png")
            .png({ quality: 95 })
            .toFile(filePath + filename);

            console.log(filename)

        req.body.imagePath = process.env.IMAGEURL + '/images/user-profile/' + filename;// Use the relative path to the image
        console.log(req.body);
    }

    next();
};

module.exports = { resizeImage, uploadUserImage };
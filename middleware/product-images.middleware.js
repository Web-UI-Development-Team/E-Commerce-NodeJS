require("dotenv").config();
// const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

const { uploadMultipleImages } = require("./upload-image.middleware");

const path = require('path')

const uploadProductImages = uploadMultipleImages(['productImages', 'productImages']);

const resizeImages = async (req, res, next) => {
    var images = [];

    for (var i = 0; i < req.files.productImages.length; i++) {
        const filename = `product-${uuidv4()}.png`;

        if (req.files.productImages[i]) {
            const filePath = path.join(__dirname, '../images/product-images/');
            // await sharp(req.files.productImages[i].buffer)
            //     .resize(700, 700)
            //     .toFormat("png")
            //     .png({ quality: 100 })
            //     .toFile(filePath + filename);

            console.log(req.body);
            if (i === 0) {
                req.body.thumbnail = process.env.IMAGEURL + '/images/product-images/' + filename
            } else {
                images.push(process.env.IMAGEURL + '/images/product-images/' + filename);
            }
        }
    }

    req.body.images = images;

    next();
};

module.exports = { resizeImages, uploadProductImages };
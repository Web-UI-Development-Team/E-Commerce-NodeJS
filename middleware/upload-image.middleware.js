const multer = require("multer");

const multerOptions = () => {
    const multerStorage = multer.memoryStorage();

    const multerFilter = (req, file, callBack) => {
        if (file.mimetype.startsWith("image")) {
            callBack(null, true);
        } else {
            callBack(null, false);
        }
    };

    const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

    return upload;
}

const uploadSingleImage = (image) => multerOptions().single(image)
const uploadMultipleImages = (images) => multerOptions().fields(images.map(image => ({ name: image, maxCount: 5 })));

module.exports = {
    uploadSingleImage,
    uploadMultipleImages
}

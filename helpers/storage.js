const multer = require('multer');

const diskStorage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'images');
    },

    filename: (req, file, callBack) => {
        const mimeType = file.mimeType.split('/');
        const fileType = mimeType[1];
        const fileName = file.originalname + '.' + fileType;
        callBack(null, fileName);
    }
})

const fileFilter = (req, file, callBack) => {
    const allowedMimeTypes = [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/webp',
    ];

    allowedMimeTypes.includes(file.mimeType) ? callBack(null, true) : callBack(null, false);
}

const storage = multer({storage: diskStorage, fileFilter: fileFilter}).single('image');

module.exports = storage;
const multer = require('multer');
const sharp = require('sharp');

const storage = multer.memoryStorage();

const filter = (req, file, cb) => {
    if (file.mimetype.split("/")[0] === 'image') {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed!"));
    }
};

module.exports = multer({
    storage,
    fileFilter: filter
}).single("image");
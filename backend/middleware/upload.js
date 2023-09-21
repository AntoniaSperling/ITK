const multer = require("multer");
const {
    GridFsStorage
} = require("multer-gridfs-storage");
const mongoose = require('mongoose');
require('dotenv').config();


const credentials = process.env.PATH_TO_PEM

const storage = new GridFsStorage({
    //db: connection,
    url: process.env.DB_CONNECTION,
    options: {
        sslKey: credentials,        // nur falls ein Zertifikat zur Autorisierung
        sslCert: credentials,       // für MongoDB Atlas verwendet wird
        dbName: "foto-pwa" },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            console.log('file.mimetype === -1')
            return `${Date.now()}-as-${file.originalname}`;
        }
        console.log('store');
        return {
            bucketName: 'posts',
            filename: `${Date.now()}-as-${file.originalname}`,
        };
    },
});

module.exports = multer({ storage });

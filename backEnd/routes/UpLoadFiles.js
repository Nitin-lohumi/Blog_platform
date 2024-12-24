const express = require('express');
const files = express.Router();
const validateImage = require("../middleware/ValidateImage");
const UploadProfileImage = require("../controlers/UploadProfileImage");
files.post('/Profile/:id',validateImage,UploadProfileImage);
module.exports = files;
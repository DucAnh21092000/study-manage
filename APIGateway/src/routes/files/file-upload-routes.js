

const express = require('express');
const { upload } = require('../../helpers/filehelper');
const { singleFileUpload, multipleFileUpload,
    getallSingleFiles, getallMultipleFiles } = require('../../controllers/imageController');
const router = express.Router();


router.post('/singleFile', upload.single('file'), singleFileUpload);
router.post('/multipleFiles', upload.array('files'), multipleFileUpload);
router.get('/getSingleFiles', getallSingleFiles);
router.get('/getFiles/:recordId', getallMultipleFiles);


module.exports = {
    routes: router
}
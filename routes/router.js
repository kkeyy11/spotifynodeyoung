const express = require('express');
const router = express.Router();
const kmy = require('../controller/KmyController'); // Path to your controller

// Route to display homepage with MP3 files
router.get('/', kmy.index);

// Route to display upload form
router.get('/add', kmy.uploadPage);

// Route to handle MP3 file upload
router.post('/upload', kmy.uploadFile);

module.exports = router;

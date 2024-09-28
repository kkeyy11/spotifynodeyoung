const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'young_ken_mark',
    password: ''
});

// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/'); // Files will be stored in the public/uploads directory
    },
    filename: (req, file, cb) => {
        // Rename the file based on user input or some logic
        const newFileName = `${Date.now()}_${file.originalname}`; // e.g., 1727517078311_filename.mp3
        cb(null, newFileName);
    }
});

const upload = multer({ storage: storage }).single('mp3file');

// Controller functions
const ymk = {
    // Renders the homepage with the list of MP3 files
    index: (req, res) => {
        const sql = 'SELECT * FROM young_mp3_files';
        db.query(sql, (err, results) => {
            if (err) throw err;
            res.render('index', { files: results }); // Pass MP3 files to the view
        });
    },
    
    // Renders the upload page
    uploadPage: (req, res) => {
        res.render('upload');
    },
    
    // Handles MP3 file upload
    uploadFile: (req, res) => {
        upload(req, res, function (err) {
            if (err) {
                return res.status(400).send('Error uploading file.');
            }
            if (!req.file) {
                return res.status(400).send('No file uploaded.');
            }
            
            // Insert file info into the database
            const sql = 'INSERT INTO young_mp3_files (file_name, file_path) VALUES (?, ?)';
            db.query(sql, [req.file.filename, `/uploads/${req.file.filename}`], (err, result) => {
                if (err) throw err;
                res.redirect('/'); // Redirect to the homepage after upload
            });
        });
    }
};

module.exports = ymk;

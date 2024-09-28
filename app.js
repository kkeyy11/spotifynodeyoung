const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes/router'); // Import your router
const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Use body-parser middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Use the router for handling routes
app.use('/', routes);

// Start the server on port 8080
app.listen(8080, () => {
    console.log('Server initialized on http://localhost:8080');
});

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// connect database
require('./utils/MongooseUtil');

// Body-parser middleware configuration
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// GET route /hello
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// APIs
app.use('/api/admin', require('./api/admin.js'));

// Start listening on specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

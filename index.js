require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const Job = require('./models/Job'); // Import the Job model

// Create Express app
const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: ["https://frontendjoblistingwebstite.onrender.com", "https://backendjoblistingwebsite.onrender.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(helmet());
app.use(morgan('combined'));

// Define routes
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find(); // Adjust query if needed for pagination
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error.message || error);
    res.status(500).json({ error: error.message || 'Error fetching jobs' });
  }
});

// Add other routes as needed...

// Connect to MongoDB
console.log('MongoDB URI:', process.env.MONGODB_URL); // Log MongoDB URI
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

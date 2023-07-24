const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MongoDB connection URL - Replace with your MongoDB Atlas connection string
const mongoURI =
  "mongodb+srv://Aruna001:xoTPhDlsWhF1wLJV@cluster0.jl4iorb.mongodb.net/myDatabase?retryWrites=true&w=majority";

// Connect to MongoDB
MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.log('Error connecting to MongoDB:', err);
    return;
  }

  // Access the database
  const db = client.db();

  // Middleware to parse incoming form data
  app.use(bodyParser.urlencoded({ extended: true }));

  // Define a route to serve your HTML page
  app.get('/', (req, res) => {
    res.sendFile("/Users/yuvraj/Downloads/atlas_starter_nodejs-master/client/index.html");
  });

  // Define a route to handle form submissions and save data to MongoDB
  app.post('/submit', (req, res) => {
    const { name, email } = req.body;

    // Save the data to the MongoDB collection
    const collection = db.collection('users'); // Replace 'users' with your desired collection name
    collection.insertOne({ name, email }, (err, result) => {
      if (err) {
        console.log('Error saving data to MongoDB:', err);
        res.status(500).send('Error saving data to MongoDB');
        return;
      }

      console.log('Data saved to MongoDB:', result.ops);
      // Redirect the user to a new page after successful form submission
      res.redirect('/success.html');
    });
  });

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});

const mongoose = require('mongoose');

// MongoDB connection URL
const mongoURI = 'mongodb+srv://roybuburpr08:roybuburpr08@cluster0.vfnqtl9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace 'mydatabase' with your database name

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


  const userSchema= mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String
  })

  const User= mongoose.model("User",userSchema);

  module.exports={User};
const mongoose = require('mongoose');

// MongoDB connection URL
const {URL} = require('./config')

// Connect to MongoDB
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


  const userSchema= new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minLength: 3,
      maxLength: 30
  },
  password: {
      type: String,
      required: true,
      minLength: 6
  },
  firstname: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50
  },
  lastname: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50
  }
  });

  const User= mongoose.model("User",userSchema);



  const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);

  module.exports={User,Account};
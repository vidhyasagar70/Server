const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    socialMediaHandle: { type: String, required: true },
    images: [String], // Array to store the image URLs
    role: { type: String, default: 'user' } // Default role is 'user'
});

const User = mongoose.model('User', userSchema);

module.exports = User;

const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,'Email is required'],
        unique: [true, 'Email must be unique'],
        minlength: [5, 'Email must be at least 5 characters long'],
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
        trim: true,
        select: false,
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: 1,
        trim: true,
        lowercase: true
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
},{timestamps: true}); 
module.exports = mongoose.model('User', userSchema); 
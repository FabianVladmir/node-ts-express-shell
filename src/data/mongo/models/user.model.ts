import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Name is required'],        
    },
    email:{
        type:String,
        required: [true, 'Email is required'], 
        unique: true,       
    },
    password:{
        type:String,
        required: [true, 'Password is required'],        
    },
    emailValidated:{
        type:Boolean,
        default: false        
    },
    img: {
        type: String
    },
    role:{
        type: [String],
        enum: ['Admin', 'User'],
        default: ['User']
    }
});

export const UserModel = mongoose.model('User', userSchema);
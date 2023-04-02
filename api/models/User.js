import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },

    // email: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    // },
    aadharNumber: {
        type: String,
        required: true,
        match: /^\d{12}$/,  // validation pattern for aadhar numbers with a fixed length of 12 digits
        unique: true  // make the aadhar number field unique to ensure that no two users have the same aadhar number
    },
    semester: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024,
        match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    },
    role: {
        type: String,
        default: 'user',
        enum: ['admin', 'user']
    }
}, { timestamps: true });



export default mongoose.model('Users', userSchema);


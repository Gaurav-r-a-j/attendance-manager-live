import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors'
import bodyParser from 'body-parser'
import authRoutes from './routes/auth.js';



const app = express();
dotenv.config();
app.use(cors());


// making middlewares for routes
// Enable CORS and body parsing
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.json());// this is to allow getting incoming json file
// var upload = multer();


const port = process.env.PORT || 5500;




// console.log("FIRST", process.env.MONGO_URI)

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.set('strictQuery', false);


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});


// Include the auth routes
app.use('/api/auth', authRoutes);
// app.use('/api/post', postRoutes);
// app.use('/api/order', printOrderRoutes);
// app.use('/api/user', userRoutes);






app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});



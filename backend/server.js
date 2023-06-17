import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import foodRouter from './routes/foodRoutes.js';
import cors from "cors";


dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({origin: 'http://localhost:3000'}));  

// Routes
app.use('/api/foods', foodRouter);
const PORT = process.env.PORT || 5000;
const MONGODB_LOCAL_PORT = process.env.MONGODB_LOCAL_PORT || 27017;
const MONGODB_USER = process.env.MONGODB_USER || 'user';
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || 'user';
const MONGODB_DATABASE = process.env.MONGODB_DATABASE || 'foods';
const MONGODB_HOST = process.env.MONGODB_HOST || 'localhost' ;
const MONGODB_DOMAIN = process.env.MONGODB_DOMAIN  || 'mongodb' ;
const MONGODB_DOCKER_PORT = process.env.MONGODB_DOCKER_PORT  || 27017 ;


//mongodb://127.0.0.1:27017/foods
//const mongoURI_ATLAS = process.env.MONGODB_ATLAS_URI ;
//const mongoURI_LOCAL =  process.env.MONGODB_LOCAL_URI;
//const mongoURI = `${MONGODB_DOMAIN}://${MONGODB_HOST}:${MONGODB_LOCAL_PORT}/${MONGODB_DATABASE}`;
//const mongoURI = `mongodb://user:usermongo-container:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_DOCKER_PORT}/${MONGODB_DATABASE}?authSource=admin`
//const mongoURI="mongodb+srv://user:user@cluster0.c4zoqgu.mongodb.net/foods"
//const mongoURI =  `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@mongo-container:${MONGODB_LOCAL_PORT}/MONGODB_LOCAL_PORT`
const mongoURI = `mongodb://mongo-container:${MONGODB_LOCAL_PORT}/${MONGODB_DATABASE}`

// Connect to MongoDB
mongoose.connect(mongoURI, {  
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 30000, // Increase the timeout to 30 seconds
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => {
  console.log('Something went wrong!!!', err);
  process.exit(1);
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

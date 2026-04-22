import express, { json, urlencoded } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import issueRoute from './routes/issueRoutes.js';
import userRoute from './routes/userRoutes.js';

dotenv.config();
const port = process.env.PORT || 3001;
const app = express();

//allow requests from frontend domain
const allowedOrigins = new Set(['http://localhost:5173', 'https://issue-tracker-system-olive.vercel.app/']);
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (!allowedOrigins.has(origin)) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// Connect to MongoDB database
try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB Atlas");
} catch (error) {
  console.error("Error connecting to MongoDB Atlas:", error);
}

app.use(json());
app.use(urlencoded({extended:true}));

app.get("/", (req, res) => {
  res.json({
    message: "Issue Tracker API is running"
  });
});

app.use('/issues', issueRoute);
app.use('/users',userRoute);

app.listen(port,()=>{
    console.log(`Server started and running on port ${port}`);
})
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './routes/userRoute.js';
dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//MongoDB connection
mongoose.set({ strictQuery: false });
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connect to mongoDB SUCCESS.');
  })
  .catch((err) => {
    console.log('Connect to mongoDB FAIL');
    console.log(err);
  });

//middleware
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});
app.use('/api/users', userRouter);
app.use((err, req, res, next) => {
  return res.json(err);
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

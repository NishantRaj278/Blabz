import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose
.connect(`${process.env.MONGO_URL}/blobz`)
.then(() => {
    console.log('db connected successfully');
})
.catch((err) => {
    console.log(err);
})

export default mongoose.connection;
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const connectMongo = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.DATABASE_URL);

    if (connection.readyState == 1) {
      console.log("Database Connected");
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export default connectMongo;

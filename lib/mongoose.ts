import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    console.log("👉 Using existing database connection");
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "skillHatchDB",
        bufferCommands: false,
      })
      .then((mongoose) => {
        console.log("✅ New MongoDB connection established");
        return mongoose;
      })
      .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;

  const state = mongoose.connection.readyState;
  switch (state) {
    case 0:
      console.log("⚠️ Mongoose state: disconnected");
      break;
    case 1:
      console.log("✅ Mongoose state: connected");
      break;
    case 2:
      console.log("⏳ Mongoose state: connecting");
      break;
    case 3:
      console.log("⚠️ Mongoose state: disconnecting");
      break;
    default:
      console.log("❓ Mongoose state: unknown", state);
  }

  return cached.conn;
}

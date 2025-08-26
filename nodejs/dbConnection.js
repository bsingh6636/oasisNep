// db.js
import mongoose from 'mongoose';
import { MONGO_URI } from './import.js';

export const dbconnection = () => {
  return mongoose.connect(MONGO_URI, {
    dbName: 'Pagee'
  }).then(() => {
    console.log('✅ Successfully connected to MongoDB');
  }).catch((err) => {
    console.log('❌ Failed to connect to MongoDB:', err.message);
    // Do not throw if you still want to start the server
    // Just log the error and return
  });
};

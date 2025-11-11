import mongoose from 'mongoose';
import { MONGO_URI } from './import.js';

const dbConnection = () => mongoose.connect(MONGO_URI, {
  dbName: 'subscriptionNepal',
}).then(() => {
  console.log('Successfully Connected to database');
}).catch((err) => {
  console.log('Failed to connect to db', err);
  throw err; // Re-throw to catch in outer block
});

export default dbConnection;

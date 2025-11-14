import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const AdminSchema = mongoose.Schema({
  name: {
    type: String,
    // required : true ,
  },
  email: {
    type: String,
    // required : true
  },

  phone: {
    type: Number,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  level: {
    type: String,
  },
});

AdminSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const Admin = mongoose.model('Admin', AdminSchema);

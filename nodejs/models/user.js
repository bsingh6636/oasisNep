import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  phone: {
    type: String,
    trim: true,
  },
  dob: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active',
  },
  preferences: {
    type: Map,
    of: String,
  },
  metadata: {
    type: Map,
    of: String,
  },
}, { timestamps: true });

// Indexes
UserSchema.index({ email: 1 }); // Single field index for email

export const User = mongoose.model('User', UserSchema);

/*
Example Document:
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "123-456-7890",
  "dob": "1990-01-15T00:00:00.000Z",
  "status": "active",
  "preferences": { "theme": "dark", "notifications": "email" },
  "metadata": { "source": "website", "signupIp": "192.168.1.1" }
}
*/

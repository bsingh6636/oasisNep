import mongoose from 'mongoose';

const RefreshTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tokenId: {
    type: String,
    required: true,
    unique: true,
  },
  hashedToken: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
  },
  revoked: {
    type: Boolean,
    default: false,
  },
  replacedByToken: {
    type: String,
  },
  expiresIn: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

// Indexes
RefreshTokenSchema.index({ userId: 1 });
RefreshTokenSchema.index({ tokenId: 1 });

export const RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema);

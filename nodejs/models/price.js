import mongoose from 'mongoose';

const PriceSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  priceType: {
    type: String,
    enum: ['list', 'promo', 'override', 'tier'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  currency: {
    type: String,
    required: true,
    default: 'NPR',
    trim: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  minQuantity: {
    type: Number,
    min: 1,
    default: 1,
  },
  appliesToUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  metadata: {
    type: Map,
    of: String,
  },
}, { timestamps: true });

// Indexes
PriceSchema.index({ itemId: 1, priceType: 1, startDate: 1, endDate: 1 }); // Compound index for efficient price lookups
PriceSchema.index({ appliesToUserId: 1 }); // Index for user-specific prices

export const Price = mongoose.model('Price', PriceSchema);

/*
Example Document:
{
  "itemId": "60c72b2f9b1e8b001c8e4a1d", // Example ObjectId for an Item
  "priceType": "list",
  "amount": 115000,
  "currency": "INR",
  "startDate": "2023-01-01T00:00:00.000Z",
  "endDate": "2024-12-31T23:59:59.999Z",
  "minQuantity": 1
}
*/

import mongoose from 'mongoose';

const PriceHistorySchema = new mongoose.Schema({
  priceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Price',
    required: true,
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  before: {
    type: Object, // Snapshot of the price document before change
    required: true,
  },
  after: {
    type: Object, // Snapshot of the price document after change
    required: true,
  },
  changedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  reason: {
    type: String,
    trim: true,
  },
}, { timestamps: true }); // Use timestamps for the audit entry itself

// Indexes
PriceHistorySchema.index({ priceId: 1 }); // Index for looking up history of a specific price
PriceHistorySchema.index({ itemId: 1 }); // Index for looking up history of prices for a specific item
PriceHistorySchema.index({ changedBy: 1 }); // Index for looking up changes made by a specific user

export const PriceHistory = mongoose.model('PriceHistory', PriceHistorySchema);

/*
Example Document:
{
  "priceId": "60c72b2f9b1e8b001c8e4a1f", // Example ObjectId for a Price
  "itemId": "60c72b2f9b1e8b001c8e4a1d", // Example ObjectId for an Item
  "before": {
    "priceType": "list",
    "amount": 115000,
    "currency": "INR",
    "startDate": "2023-01-01T00:00:00.000Z"
  },
  "after": {
    "priceType": "list",
    "amount": 110000,
    "currency": "INR",
    "startDate": "2023-01-01T00:00:00.000Z"
  },
  "changedBy": "60c72b2f9b1e8b001c8e4a1e", // Example ObjectId for a User
  "reason": "Promotional discount applied"
}
*/

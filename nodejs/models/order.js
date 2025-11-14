import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  lineItems: [{
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    unitPrice: { // Snapshot of price at the time of order
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      required: true,
      default: 'INR',
    },
    variant: { // Snapshot of selected variant
      name: String,
      value: String,
    },
  }],
  subtotal: {
    type: Number,
    required: true,
    min: 0,
  },
  tax: {
    type: Number,
    default: 0,
    min: 0,
  },
  shippingCost: {
    type: Number,
    default: 0,
    min: 0,
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  currency: {
    type: String,
    required: true,
    default: 'INR',
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  metadata: {
    type: Map,
    of: String,
  },
}, { timestamps: true });

// Indexes
OrderSchema.index({ orderNumber: 1 }, { unique: true }); // Unique index for order number
OrderSchema.index({ userId: 1 }); // Index for user's orders

export const Order = mongoose.model('Order', OrderSchema);

/*
Example Document:
{
  "userId": "60c72b2f9b1e8b001c8e4a1e", // Example ObjectId for a User
  "orderNumber": "ORD-2023-0001",
  "lineItems": [
    {
      "itemId": "60c72b2f9b1e8b001c8e4a1d", // Example ObjectId for an Item
      "itemName": "Laptop Pro",
      "quantity": 1,
      "unitPrice": 115000,
      "currency": "INR",
      "variant": { "name": "Color", "value": "Space Gray" }
    }
  ],
  "subtotal": 115000,
  "tax": 5750,
  "shippingCost": 500,
  "totalAmount": 121250,
  "currency": "INR",
  "status": "pending"
}
*/

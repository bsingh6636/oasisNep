import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  sku: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  variants: [{
    name: { type: String, required: true },
    value: { type: String, required: true },
    additionalPrice: { type: Number, default: 0 },
  }],
  inventory: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  basePrice: {
    type: Number,
    required: true,
    min: 0,
  },
  currency: {
    type: String,
    required: true,
    default: 'NPR', // Default currency based on common practice
    trim: true,
  },
  metadata: {
    type: Map,
    of: String,
  },
}, { timestamps: true });

// Indexes
ItemSchema.index({ sku: 1 }, { unique: true }); // Unique index for SKU
ItemSchema.index({ name: 1 }); // Index for name

export const Item = mongoose.model('Item', ItemSchema);

/*
Example Document:
{
  "name": "Laptop Pro",
  "description": "High-performance laptop for professionals",
  "sku": "LAPTOP-PRO-001",
  "variants": [
    { "name": "Color", "value": "Space Gray" },
    { "name": "Storage", "value": "512GB SSD", "additionalPrice": 100 }
  ],
  "inventory": 50,
  "basePrice": 120000,
  "currency": "INR",
  "metadata": { "brand": "TechCorp", "weight": "1.5kg" }
}
*/

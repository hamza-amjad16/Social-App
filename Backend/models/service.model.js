import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  service: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  provider: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export const Service = mongoose.model('Service', serviceSchema);



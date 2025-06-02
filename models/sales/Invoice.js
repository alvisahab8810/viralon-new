import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  item: String,
  quantity: Number,
  rate: Number,
  amount: Number,
});

const invoiceSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  invoiceNumber: { type: String, required: true, unique: true },
  referenceNumber: { type: String },
  invoiceDate: { type: Date },
  dueDate: { type: Date },
  subject: { type: String },

  items: [itemSchema],

  subtotal: Number,
  discount: Number,
  gst: Number,
  adjustment: Number,
  total: Number,

  customerNotes: String,
  terms: String,

  attachedFiles: [String],
  customerEmail: String,

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Invoice || mongoose.model('Invoice', invoiceSchema);

// import mongoose from 'mongoose';

// const itemSchema = new mongoose.Schema({
//   item: String,
//   quantity: Number,
//   rate: Number,
//   amount: Number,
// });

// const invoiceSchema = new mongoose.Schema({
//   customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
//   invoiceNumber: { type: String, required: true, unique: true },
//   referenceNumber: { type: String },
//   invoiceDate: { type: Date },
//   dueDate: { type: Date },
//   subject: { type: String },

//   items: [itemSchema],

//   subtotal: Number,
//   discount: Number,
//   gst: Number,
//   adjustment: Number,
//   total: Number,

//   customerNotes: String,
//   terms: String,

//   attachedFiles: [String],
//   customerEmail: String,

//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.models.Invoice || mongoose.model('Invoice', invoiceSchema);



import mongoose from 'mongoose';

// Define the item schema
const itemSchema = new mongoose.Schema({
  item: { type: String, required: true },
  quantity: { type: Number, required: true },
  rate: { type: Number, required: true },
  amount: { type: Number, required: true },
});

// Define the payment schema
const paymentSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  method: { type: String }, // e.g., Cash, Bank Transfer, UPI
  note: { type: String },
  date: { type: Date, default: Date.now },
  refunded: { type: Boolean, default: false }, // ✅ add this
});

// Define the invoice schema
const invoiceSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  invoiceNumber: { type: String, required: true, unique: true },
  referenceNumber: String,
  invoiceDate: Date,
  dueDate: Date,
  subject: String,

  items: [itemSchema],
  subtotal: Number,
  discount: Number,
  gst: Number,
  adjustment: Number,
  total: Number,

  payments: [paymentSchema],
  amountPaid: { type: Number, default: 0 },
  balanceDue: {
    type: Number,
    default: function () {
      return this.total;
    },
  },
  paymentStatus: {
    type: String,
    enum: ['Unpaid', 'Partially Paid', 'Paid'],
    default: 'Unpaid',
  },

  customerNotes: String,
  terms: String,
  attachedFiles: [String],
  customerEmail: String,

    previewHTML: String, // 👈 ADD THIS LINE
    sacCode: { type: String }, // 👈 New field added here

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Invoice || mongoose.model('Invoice', invoiceSchema);

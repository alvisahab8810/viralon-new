// // // models/payroll/Attendance.js
// // import mongoose from "mongoose";

// // const attendanceSchema = new mongoose.Schema({
// //   employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
// //   date: { type: String, required: true }, // Format: YYYY-MM-DD
// //   loginTime: { type: String },
// //   logoutTime: { type: String },
// // });

// // export default mongoose.models.Attendance ||
// //   mongoose.model("Attendance", attendanceSchema);



// // models/payroll/Attendance.js
// import mongoose from "mongoose";

// const attendanceSchema = new mongoose.Schema({
//   employee: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Employee",
//     required: true,
//   },
//   date: {
//     type: String, // Format: YYYY-MM-DD
//     required: true,
//   },
//   loginTime: { type: String },  // Stored as ISO string
//   logoutTime: { type: String }, // Stored as ISO string

//   // ✅ New fields for summary & calendar visualization
//   isHalfDay: { type: Boolean, default: false }, // e.g. worked < 4 hours
//   status: {
//     type: String,
//     enum: ["present", "absent", "weekend", "leave"],
//     default: "absent",
//   },
//   leaveType: {
//     type: String,
//     enum: ["paid", "unpaid", "none"],
//     default: "none",
//   },
//   regularized: { type: Boolean, default: false }, // for manual regularization
// });

// attendanceSchema.index({ employee: 1, date: 1 }, { unique: true });

// export default mongoose.models.Attendance ||
//   mongoose.model("Attendance", attendanceSchema);





// models/payroll/Attendance.js
import mongoose from "mongoose";

const punchSchema = new mongoose.Schema(
  {
    in:  { type: Date, required: true },
    out: { type: Date, default: null },
  },
  { _id: false }
);

const attendanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  date: {
    type: String, // YYYY-MM-DD
    required: true,
  },

  // Legacy fields (keep so nothing breaks)
  loginTime: { type: String },
  logoutTime: { type: String },

  // New multi-punch support
  punches: { type: [punchSchema], default: [] },

  totalWorkedMinutes: { type: Number, default: 0 },
  totalBreakMinutes: { type: Number, default: 0 },
  longestBreakMinutes: { type: Number, default: 0 },
  lunchBreakExceeded: { type: Boolean, default: false }, // >50m break

  // Existing summary flags
  isHalfDay: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ["present", "absent", "weekend", "leave"],
    default: "absent",
  },
  leaveType: {
    type: String,
    enum: ["paid", "unpaid", "none"],
    default: "none",
  },
  regularized: { type: Boolean, default: false },

  loginLocation: {
  latitude: Number,
  longitude: Number,
},
logoutLocation: {
  latitude: Number,
  longitude: Number,
},

});

attendanceSchema.index({ employee: 1, date: 1 }, { unique: true });

export default mongoose.models.Attendance ||
  mongoose.model("Attendance", attendanceSchema);

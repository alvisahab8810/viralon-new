


// import dbConnect from "@/utils/dbConnect";
// import Attendance from "@/models/payroll/Attendance";
// import { getTodayDate } from "@/utils/time";
// import { getEmployeeFromToken } from "@/utils/auth";

// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).end();

//   await dbConnect();

//   const employee = await getEmployeeFromToken(req);
//   if (!employee) return res.status(401).json({ success: false, message: "Unauthorized" });

//   const today = getTodayDate(); // returns YYYY-MM-DD

//   const existing = await Attendance.findOne({ employee: employee._id, date: today });

//   if (existing && existing.loginTime) {
//     return res.status(400).json({ success: false, message: "Already logged in today" });
//   }

//   const loginTime = new Date(); // ✅ full ISO date

//   // const updated = await Attendance.findOneAndUpdate(
//   //   { employee: employee._id, date: today },
//   //   {
//   //     loginTime,
//   //     loginLocation: {
//   //       latitude: req.body.latitude,
//   //       longitude: req.body.longitude,
//   //     },
//   //   },
//   //   { upsert: true, new: true }
//   // );


//   const updated = await Attendance.findOneAndUpdate(
//   { employee: employee._id, date: today },
//   {
//     date: today, // ✅ Important: Ensure it's saved
//     loginTime,
//     loginLocation: {
//       latitude: req.body.latitude,
//       longitude: req.body.longitude,
//     },
//   },
//   { upsert: true, new: true }
// );


//   return res.status(200).json({
//     success: true,
//     loginTime: updated.loginTime, // ✅ return full Date object
//   });
// }





// import dbConnect from "@/utils/dbConnect";
// import Attendance from "@/models/payroll/Attendance";
// import { getTodayDate } from "@/utils/time";
// import { getEmployeeFromToken } from "@/utils/auth";

// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).end();

//   await dbConnect();

//   const employee = await getEmployeeFromToken(req);
//   if (!employee) {
//     return res.status(401).json({ success: false, message: "Unauthorized" });
//   }

//   const today = getTodayDate();            // "YYYY-MM-DD"
//   const now = new Date();

//   // Try to find today's record
//   let att = await Attendance.findOne({ employee: employee._id, date: today });

//   // Already actively logged in? (legacy single-session guard)
//   if (att && att.punches.length > 0) {
//     const lastPunch = att.punches[att.punches.length - 1];
//     if (!lastPunch.out) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Already clocked in." });
//     }
//   }

//   // Create or update with new punch
//   if (!att) {
//     att = await Attendance.create({
//       employee: employee._id,
//       date: today,
//       loginTime: now,         // legacy
//       status: "present",      // assume present once clocked in
//       punches: [{ in: now }],
//       loginLocation: {
//         latitude: req.body.latitude,
//         longitude: req.body.longitude,
//       },
//     });
//   } else {
//     // If legacy loginTime not set, backfill on first punch
//     if (!att.loginTime) att.loginTime = now;
//     att.status = "present";
//     att.punches.push({ in: now });
//     att.loginLocation = {
//       latitude: req.body.latitude,
//       longitude: req.body.longitude,
//     };
//     await att.save();
//   }

//   return res.status(200).json({
//     success: true,
//     loginTime: att.loginTime,
//     punches: att.punches,
//   });
// }








import dbConnect from "@/utils/dbConnect";
import Attendance from "@/models/payroll/Attendance";
import { getTodayDate } from "@/utils/time";
import { getEmployeeFromToken } from "@/utils/auth";

// serialize helper
function serializeAttendance(att) {
  if (!att) return null;
  return {
    _id: att._id.toString(),
    employee: att.employee?.toString?.() ?? att.employee,
    date: att.date,
    loginTime: att.loginTime || null,
    logoutTime: att.logoutTime || null,
    status: att.status,
    isHalfDay: att.isHalfDay,
    totalWorkedMinutes: att.totalWorkedMinutes ?? 0,
    totalBreakMinutes: att.totalBreakMinutes ?? 0,
    longestBreakMinutes: att.longestBreakMinutes ?? 0,
    lunchBreakExceeded: !!att.lunchBreakExceeded,
    punches: att.punches?.map((p) => ({
      in: p.in ? p.in.toISOString() : null,
      out: p.out ? p.out.toISOString() : null,
    })) ?? [],
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await dbConnect();

  const employee = await getEmployeeFromToken(req);
  if (!employee) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const { latitude, longitude } = req.body || {};
  const today = getTodayDate();
  const now = new Date();

  let att = await Attendance.findOne({ employee: employee._id, date: today });

  if (!att) {
    att = await Attendance.create({
      employee: employee._id,
      date: today,
      loginTime: now, // legacy
      status: "present",
      leaveType: "none",
      punches: [{ in: now }],
      loginLocation: { latitude, longitude },
    });
  } else {
    // open punch guard
    const lastPunch = att.punches[att.punches.length - 1];
    if (lastPunch && !lastPunch.out) {
      return res.status(400).json({
        success: false,
        message: "Already clocked in.",
        attendance: serializeAttendance(att),
      });
    }
    if (!att.loginTime) att.loginTime = now;
    att.status = "present";
    att.punches.push({ in: now, out: null });
    att.loginLocation = { latitude, longitude };
    await att.save();
  }

  return res.status(200).json({
    success: true,
    attendance: serializeAttendance(att),
  });
}

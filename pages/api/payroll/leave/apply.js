import dbConnect from '@/utils/dbConnect';
import LeaveRequest from '@/models/payroll/LeaveRequest';
import Employee from '@/models/payroll/Employee';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const { type, from, to, reason, employeeId } = req.body;

    // Validation
    if (!type || !from || !to || !reason || !employeeId) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Verify employee exists
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    // Create leave request
    const newLeave = await LeaveRequest.create({
      employeeId,
      type,
      from,
      to,
      reason,
    });

    return res.status(200).json({ success: true, data: newLeave });

  } catch (err) {
    console.error('Leave apply error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

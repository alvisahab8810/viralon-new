// import formidable from 'formidable';
// import fs from 'fs';
// import path from 'path';
// import dbConnect from '../../../utils/dbConnect'; // Adjust if needed
// import Application from '../../../models/Application'; // Make sure this file exists

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req, res) {
//   await dbConnect();

//   if (req.method !== 'POST') {
//     res.status(405).json({ success: false, message: 'Method Not Allowed' });
//     return;
//   }

//   const form = formidable({
//     multiples: false,
//     uploadDir: path.join(process.cwd(), '/public/uploads'),
//     keepExtensions: true,
//   });

//   try {
//     // Ensure the upload directory exists
//     fs.mkdirSync(form.uploadDir, { recursive: true });

//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         console.error('Formidable error:', err);
//         res.status(500).json({ success: false, message: 'File upload failed' });
//         return;
//       }

//       try {
//         // Extract fields and convert from array to string if needed
//         let { appliedPosition, name, email, mobile, portfolioLink } = fields;

//         appliedPosition = Array.isArray(appliedPosition) ? appliedPosition[0] : appliedPosition;
//         name = Array.isArray(name) ? name[0] : name;
//         email = Array.isArray(email) ? email[0] : email;
//         mobile = Array.isArray(mobile) ? mobile[0] : mobile;
//         portfolioLink = Array.isArray(portfolioLink) ? portfolioLink[0] : portfolioLink;

//         let resumePath = '';
//         if (files.resume && files.resume[0] && files.resume[0].filepath) {
//         //   resumePath = '/uploads/' + path.basename(files.resume[0].filepath);
//         const originalName = files.resume[0].originalFilename;
// const newFilename = Date.now() + '-' + originalName;
// const newPath = path.join(form.uploadDir, newFilename);

// fs.renameSync(files.resume[0].filepath, newPath); // Rename file to original name

// resumePath = '/uploads/' + newFilename;

//         }

//         const newApp = new Application({
//           appliedPosition,
//           name,
//           email,
//           mobile,
//           portfolioLink,
//            resumePath: resumePath,  // <-- use resumePath here, not resumeUrl
//         });

//         await newApp.save();

//         res.status(200).json({ success: true, message: 'Application submitted successfully',
//              resumePath: resumePath,  // <-- use resumePath here, not resumeUrl // Include the CV download path in the response
//          });
//       } catch (saveErr) {
//         console.error('Database error:', saveErr);
//         res.status(500).json({ success: false, message: 'Failed to save application' });
//       }
//     });
//   } catch (error) {
//     console.error('Unexpected error:', error);
//     res.status(500).json({ success: false, message: 'Unexpected server error' });
//   }
// }



import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import dbConnect from '../../../utils/dbConnect';
import Application from '../../../models/Application';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const form = formidable({
    multiples: false,
    uploadDir: path.join(process.cwd(), '/public/uploads'),
    keepExtensions: true,
  });

  // ✅ Ensure uploads folder exists
  fs.mkdirSync(form.uploadDir, { recursive: true });

form.parse(req, async (err, fields, files) => {
  if (err) {
    console.error('Formidable error:', err);
    return res.status(500).json({ success: false, message: 'File upload failed' });
  }

  console.log('Files received:', files);

  let { appliedPosition, name, email, mobile, portfolioLink } = fields;

  appliedPosition = Array.isArray(appliedPosition) ? appliedPosition[0] : appliedPosition;
  name = Array.isArray(name) ? name[0] : name;
  email = Array.isArray(email) ? email[0] : email;
  mobile = Array.isArray(mobile) ? mobile[0] : mobile;
  portfolioLink = Array.isArray(portfolioLink) ? portfolioLink[0] : portfolioLink;

  let resumePath = '';

  if (files.resume) {
    // Check if resume is an array (multiple files) or single object
    const file = Array.isArray(files.resume) ? files.resume[0] : files.resume;

    if (file && file.filepath) {
      const originalName = file.originalFilename || 'resume.pdf';
      const newFilename = Date.now() + '-' + originalName;
      const newPath = path.join(form.uploadDir, newFilename);

      fs.renameSync(file.filepath, newPath);

      resumePath = '/uploads/' + newFilename;
    } else {
      console.error('File object does not have filepath');
    }
  } else {
    console.error('No resume file uploaded');
  }

  const newApp = new Application({
    appliedPosition,
    name,
    email,
    mobile,
    portfolioLink,
     resumePath: resumePath,  // <-- use resumePath here, not resumeUrl
  });

  await newApp.save();

  return res.status(200).json({
    success: true,
    message: 'Application submitted successfully',
     resumePath: resumePath,  // <-- use resumePath here, not resumeUrl
  });
});


}

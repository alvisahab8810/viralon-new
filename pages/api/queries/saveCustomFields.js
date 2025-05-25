// import dbConnect from "../../../utils/dbconnect";
// import Query from "../../../models/Query";
// import Contact from "../../../models/Contact"; // ✅ import contact model


// export default async function handler(req, res) {
//   await dbConnect();

//   if (req.method === "POST") {
//     const data = req.body; // { queryId: { field1: value1, field2: value2, ... }, ... }

//     try {
//       const updatePromises = Object.entries(data).map(async ([queryId, fields]) => {
//         return Query.findByIdAndUpdate(queryId, { customFields: fields });
//       });

//       await Promise.all(updatePromises);

//       res.status(200).json({ message: "Custom fields saved successfully" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Failed to save custom fields" });
//     }
//   } else {
//     res.status(405).json({ message: "Method not allowed" });
//   }
// }




import dbConnect from "../../../utils/dbconnect";
import Query from "../../../models/Query";
import Contact from "../../../models/Contact";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const data = req.body;

    try {
      const updatePromises = Object.entries(data).map(async ([docId, fields]) => {
        // First try updating a Query
        let updated = await Query.findByIdAndUpdate(docId, { customFields: fields });

        if (updated) {
          console.log(`✅ Saved to Query: ${docId}`);
          return updated;
        }

        // If not found in Query, try updating a Contact
        updated = await Contact.findByIdAndUpdate(docId, { customFields: fields });

        if (updated) {
          console.log(`✅ Saved to Contact: ${docId}`);
          return updated;
        }

        // Neither found
        console.log(`❌ Document not found in Query or Contact: ${docId}`);
        return null;
      });

      await Promise.all(updatePromises);

      res.status(200).json({ message: "Custom fields saved successfully" });
    } catch (error) {
      console.error("❌ Save failed:", error);
      res.status(500).json({ message: "Failed to save custom fields" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

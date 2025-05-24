import dbConnect from "../../../utils/dbconnect";
import Query from "../../../models/Query";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const data = req.body; // { queryId: { field1: value1, field2: value2, ... }, ... }

    try {
      const updatePromises = Object.entries(data).map(async ([queryId, fields]) => {
        return Query.findByIdAndUpdate(queryId, { customFields: fields });
      });

      await Promise.all(updatePromises);

      res.status(200).json({ message: "Custom fields saved successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to save custom fields" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

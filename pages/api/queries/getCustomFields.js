import dbConnect from "../../../utils/dbconnect";
import Query from "../../../models/Query";

export default async function handler(req, res) {
  await dbConnect();

  try {
    const queries = await Query.find();
    const result = {};

    queries.forEach((q) => {
      result[q._id] = q.customFields || {};
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching custom fields" });
  }
}

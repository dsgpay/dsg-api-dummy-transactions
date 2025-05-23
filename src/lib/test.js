import { MongoClient } from "mongodb";

import { STPSchema } from "../schemas/stp/schema.js";
import { validateSchema } from "./validate.js";
import { generateDummyData } from "./mock.js";

const url = process.env.MONGO_URL || "mongodb://localhost:27017";
const client = new MongoClient(url);

try {
  const mockData = generateDummyData();
  console.log("Mock Data:", mockData);

  const validData = await validateSchema(STPSchema, mockData);
  console.log("Valid Data:", validData);

  await client.connect();
  const collection = client.db().collection("ds_corp_stp_payment");
  const docs = await collection.insertOne(validData);
  console.log("docs :>> ", docs);
} catch (error) {
  console.error("Validation Error:", error);
} finally {
  await client.close();
  console.log("MongoDB connection closed.");
}

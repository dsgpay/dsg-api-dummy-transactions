import { STPSchema } from "../schemas/stp/schema.js";
import { validateSchema } from "./validate.js";
import { generateDummyData } from "./mock.js";

try {
  const mockData = generateDummyData();
  console.log("Mock Data:", mockData);

  const validData = await validateSchema(STPSchema, mockData);
  console.log("Valid Data:", validData);
} catch (error) {
  console.error("Validation Error:", error);
}

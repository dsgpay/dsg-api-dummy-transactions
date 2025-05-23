import { ValidationError, ObjectSchema } from "yup";

/**
 * Creates a middleware to validate the request body using Yup.
 * @param {ObjectSchema} schema Yup validation schema
 */
export const validateSchema = async (schema, data) => {
  try {
    const validated = await schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });
    return validated;
  } catch (err) {
    if (err instanceof ValidationError) {
      const formattedErrors = err.inner.reduce((acc, curr) => {
        acc[curr.path || "Schema"] = curr.message;
        return acc;
      }, {});
      throw {
        error: "Validation Failed",
        details: Object.keys(formattedErrors)
          .sort()
          .reduce((acc, key) => {
            acc[key] = formattedErrors[key];
            return acc;
          }, {}),
      };
    }
    // Unexpected error
    throw { error: "Server error", message: err.message };
  }
};

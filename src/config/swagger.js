import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sandbox API",
      version: "1.0.0",
      description: "A simple ES6 Node.js Sandbox API",
      license: {
        name: "Licensed Under MIT",
        // url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: "JSONPlaceholder",
        // url: 'https://jsonplaceholder.typicode.com',
      },
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
    tags: [
      {
        name: "STP Payment",
        description: "STP Payment management",
      },
    ],
  },
  apis: ["./src/api/*/*.route.js", "./src/api/*/*.cmps.js"], // JSDoc source files
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;

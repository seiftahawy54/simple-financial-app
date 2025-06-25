import swaggerJsdoc from 'swagger-jsdoc';
import * as path from "node:path";

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My Node.js API',
      version: '1.0.0',
      description: 'API documentation for my Node.js application',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
      },
    ],
  },
  apis: [path.resolve('routes/*.js')],
};

const swaggerDocument = swaggerJsdoc(options);

export default swaggerDocument;

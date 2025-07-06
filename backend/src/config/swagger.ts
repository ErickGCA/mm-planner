import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Travel Planner API',
      version: '1.0.0',
      description: 'Documentação da API do Travel Planner',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        RegisterUser: {
          type: 'object',
          required: ['email', 'password', 'name'],
          properties: {
            name: { type: 'string', example: 'Erick Cabral' },
            email: { type: 'string', example: 'erick@email.com' },
            password: { type: 'string', example: 'senha123' },
          },
        },
        LoginUser: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', example: 'erick@email.com' },
            password: { type: 'string', example: 'senha123' },
          },
        },
      },
    },
    security: [
      { bearerAuth: [] }
    ],
  },
  apis: ['src/routes/*.ts', 'src/controllers/*.ts'], 
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
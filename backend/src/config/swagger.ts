import swaggerJsdoc from 'swagger-jsdoc'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Dartsee API',
      version: '1.0.0',
      description: 'API documentation for Dartsee dart game statistics',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/config/swagger/*.yaml'],
}

export const swaggerSpec = swaggerJsdoc(options)

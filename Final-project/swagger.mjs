import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endPointsFiles = ['./server.mjs'];

const doc = {
  info: {
    title: 'Online Store API',
    description:
      'This API allows manage the flow of an online store, since managin the users to the inventory and item carts of the users',
  },
  host: 'online-store-cse341.onrender.com',
  schemes: ['http', 'https'],
};

swaggerAutogen(outputFile, endPointsFiles, doc);

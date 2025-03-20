import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endPointsFiles = ['./server.mjs'];

const doc = {
  info: {
    title: 'Contact API for the CSE341 project',
    description: 'This API allows you to create and manage a contact book list',
  },
  host: 'cse-341-project-1-vm8u.onrender.com',
  schemes: ['http', 'https'],
};

swaggerAutogen(outputFile, endPointsFiles, doc);

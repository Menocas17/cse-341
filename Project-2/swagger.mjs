import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endPointsFiles = ['./server.mjs'];

const doc = {
  info: {
    title: 'Meal Planner API for the CSE341 project',
    description:
      'This API allows you to create and manage meal plans as an user and to manage user as an admin',
  },
  host: 'cse-341-project-2-cdw3.onrender.com',
  schemes: ['http', 'https'],
};

swaggerAutogen(outputFile, endPointsFiles, doc);

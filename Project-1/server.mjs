import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './models/database.mjs';
import contactRouter from './routes/contact.mjs';
import swaggerUI from 'swagger-ui-express';
import swaggerDocumentation from './swagger.json' with { type: 'json' };
import cors from 'cors';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

//middlewares
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  next();
});
app.use(cors());
app.use(express.json());

//routes
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));
app.use('', contactRouter);

// setting the server up
(async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server running on http:localhost:${port}`);
  });
})();

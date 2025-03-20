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
app.use(express.json());
app.use(cors());

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

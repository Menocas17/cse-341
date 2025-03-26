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

app.use(cors());
app.use(express.json());

//routes
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));
app.use('', contactRouter);

app.use(async (req, res, next) => {
  next({ status: 404, message: 'Sorry, we appear to have lost that page.' });
});

// error handeling middleware

app.use((err, req, res, next) => {
  // console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    status: err.status || 500,
  });
});

// setting the server up
(async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server running on http:localhost:${port}`);
  });
})();

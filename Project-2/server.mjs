import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './models/database.mjs';
import mealsRoutes from './routes/mealsRoutes.mjs';
import usersRoutes from './routes/usersRoutes.mjs';
import swaggerUI from 'swagger-ui-express';
import swaggerDocumentation from './swagger.json' with { type: 'json' };
import passport from 'passport';
import './config/passport.mjs';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(passport.initialize());

//base index route
app.get('/', (req, res) => {
  res.send(
    'Hellou this is the meal planner API, try with "/doc", to see a full documentation of this API'
  );
});

//routes
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));
app.use('/users', usersRoutes);
app.use('/meals', mealsRoutes);

// route for handle not defines routes
app.use(async (req, res, next) => {
  next({ status: 404, message: 'Sorry, we appear to have lost that page.' });
});

// error handeling middleware

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    status: err.status || 500,
  });
});

// starting the DB connection and starting the server

(async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
})();

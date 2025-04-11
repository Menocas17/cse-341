import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cartsRoutes from './routes/cart.mjs';
import usersRoutes from './routes/users.mjs';
import productsRoutes from './routes/products.mjs';
import reviewsRoutes from './routes/reviews.mjs';
import { connectDB } from './models/database.mjs';
import cookieParser from 'cookie-parser';
import passport from 'passport';
// import './config/passport.mjs';
import swaggerUI from 'swagger-ui-express';
// import swaggerDocumentation from './swagger.json' with { type: 'json' };
import { errorMiddleware } from './middlewares/handleErrors.mjs';

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
    'Hellou this is the online store API, try with "/doc", to see a full documentation of this API'
  );
});

//routes
app.use('/products', productsRoutes);
app.use('/carts', cartsRoutes);
app.use('/users', usersRoutes);
app.use('/reviews', reviewsRoutes);

// route for handle not defines routes
app.use(async (req, res, next) => {
  next({ status: 404, message: 'Sorry, we appear to have lost that page.' });
});

// error handeling middleware

app.use(errorMiddleware);

// starting the DB connection and starting the server

(async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
})();

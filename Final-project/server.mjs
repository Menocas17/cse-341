import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import productsRoutes from './routers/products.mjs';
import cartsRoutes from './routers/cart.mjs';
import usersRoutes from './routers/users.mjs';
import { connectDB } from './models/database.mjs';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(cors());

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

// starting the DB connection and starting the server

(async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
})();

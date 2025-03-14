import dotenv from 'dotenv';
import express from 'express';
import contactRouter from './routes/contact.mjs';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use('', contactRouter);

app.listen(port, () => {
  console.log(`Server running on http:localhost:${port}`);
});

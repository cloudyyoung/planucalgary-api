import express from 'express';
import { PORT } from './config';
import loader from './loaders/index';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const app = express();

loader(app);

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

export default app
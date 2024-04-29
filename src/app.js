import express from 'express';
import { PORT } from './config.js';
import loader from './loaders/index.js';

const app = express();

loader(app);

app.listen(PORT, err => {
  if (err) {
    console.log(err);
    return process.exit(1);
  }
  console.log(`Server is running on ${PORT}`);
});

export default app
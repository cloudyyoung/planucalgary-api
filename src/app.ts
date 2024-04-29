import express from 'express';
import { PORT } from './config';
import loader from './loaders/index';

const app = express();

loader(app);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

export default app
import mongoose from 'mongoose';

import { DB_URI } from '../config';

export default async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(DB_URI || "")
    .then(() => {
      console.log('Mongodb Connection');
    })
    .catch(err => {
      console.log(err);
    });
};
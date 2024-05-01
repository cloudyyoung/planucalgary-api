import mongoose from 'mongoose';
const { Schema, connection } = mongoose;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    unique: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true
  }

}, {
  timestamps: true
})

const accountDb = connection.useDb('account');
const Accounts = accountDb.model("Account", userSchema, 'accounts')
export { Accounts }
import mongoose from 'mongoose';
const { Schema, connection } = mongoose;

const accountProgramSchema = new Schema({
  account_id: { type: String, ref: 'Accounts', required: true },
  program_id: { type: String, ref: 'Program', required: true }
},{
  timestamps: true
});

const AccountProgram = mongoose.model("AccountProgram", accountProgramSchema)
export { AccountProgram }
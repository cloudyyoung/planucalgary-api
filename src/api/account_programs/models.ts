import mongoose from 'mongoose';
const { Schema, connection } = mongoose;

const accountProgramSchema = new Schema({
  account_id: { type: String, ref: 'Accounts', required: true },
  program_id: { type: String, ref: 'Program', required: true }
},{
  timestamps: true
});

const accountDb = connection.useDb('account');
const AccountProgram = accountDb.model("AccountProgram", accountProgramSchema, 'account_programs')
export { AccountProgram }
import mongoose from 'mongoose';
const { Schema, connection } = mongoose;

const accountProgramSchema = new Schema({
  account_id: { type: Schema.Types.ObjectId, ref: 'Accounts', required: true },
  program_id: { type: Schema.Types.ObjectId, ref: 'Program', required: true }
},{
  timestamps: true
});

const AccountProgramSchema = mongoose.model("AccountProgram", accountProgramSchema)
export { AccountProgramSchema }
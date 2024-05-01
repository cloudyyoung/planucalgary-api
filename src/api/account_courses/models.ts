import mongoose from 'mongoose';
const { Schema, connection } = mongoose;

const accountCourseSchema = new Schema({
  account_id: { type: Schema.Types.ObjectId, ref: 'Accounts', required: true },
  course_id: { type: Schema.Types.ObjectId, ref: 'Course', required: true }
}, {
  timestamps: true
});

const accountDb = connection.useDb('account');
const AccountCourseSchema = accountDb.model("AccountCourses", accountCourseSchema, 'account_courses')
export { AccountCourseSchema }
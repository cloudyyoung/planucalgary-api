import mongoose from 'mongoose';
const { Schema, connection } = mongoose;

const accountCourseSchema = new Schema({
  account_id: { type: Schema.Types.ObjectId, ref: 'Accounts', required: true },
  course_id: { type: Schema.Types.ObjectId, ref: 'Course', required: true }
},{
  timestamps: true
});

const AccountCourseSchema = mongoose.model("AccountCourses", accountCourseSchema)
export { AccountCourseSchema }
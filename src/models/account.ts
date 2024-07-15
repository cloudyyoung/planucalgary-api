import { Schema, connection } from "mongoose"

import { AccountDocument, AccountModel } from "./interfaces.gen"
import { CatalogCourse } from "./catalog_course"
import { CatalogProgram } from "./catalog_program"

const schema = new Schema(
  {
    programs: {
      type: [String],
      required: true,
      default: [],
    },

    courses: {
      type: [Schema.Types.Mixed],
      required: true,
      default: [],
    },
    username: {
      type: String,
      required: true,
      min: 3,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

schema.methods.getStudentRecord = function (this: AccountDocument) {
  const courseIds = this.courses.map((x) => x.id)
  const courses = CatalogCourse.find({ coursedog_id: { $in: courseIds } })

  const programIds = this.programs
  const programs = CatalogProgram.find({ coursedog_id: { $in: programIds } })

  return { courses, programs }
}

const accountDb = connection.useDb("account")
const Account = accountDb.model<AccountDocument, AccountModel>("Account", schema, "accounts")
export { Account }

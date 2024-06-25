import { Schema, connection } from "mongoose"

import { AccountDocument, AccountModel } from "./interfaces.gen"

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

const accountDb = connection.useDb("account")
const Account = accountDb.model<AccountDocument, AccountModel>("Account", schema, "accounts")
export { Account }

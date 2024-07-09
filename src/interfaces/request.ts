import { Request } from "express"

import { AccountDocument } from "../models/interfaces.gen"

export interface AuthenticatedRequest extends Request {
  account?: AccountDocument
}

import Account from "../accounts/types"
import User from "../accounts/interfaces"

export default interface JwtContent {
  payload: content
  exp: number
  iat: number
}

interface content {
  user: Account
}


export interface CourseId {
  id: string
  term: object
}

import Account from "../accounts/types"

export default interface JwtContent {
  payload: content
  exp: number
  iat: number
}

interface content {
  user: Account
}

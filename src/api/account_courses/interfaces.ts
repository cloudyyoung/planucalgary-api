import User from '../accounts/interfaces'

export default interface JwtContent {
  payload: content,
  exp: number,
  iat: number
}

interface content {
  user: User
}



// AUTH
export { default as register } from './auth/register.js'
export { default as login } from './auth/login.js'
export { default as logout } from './auth/logout.js'
export { default as verifyEmail } from './auth/verify-email.js'
export { default as refreshToken } from './auth/refresh-token.js'
export { default as forgotPassword } from './auth/forgot-password.js'
export { default as sendVerificationCode } from './auth/send-verification-code.js'

// EDIT
export { default as changePassword } from './edit/change-password.js'
export { default as editAccount } from './edit/edit-account.js'

// OTHER
export { default as getAccount } from './get-account.js'
export { default as deleteAccount } from './delete-account.js'
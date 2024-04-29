import pkg from 'jsonwebtoken';
const { sign } = pkg;
import { jwtSecretKey, refreshTokenSecretKey } from '../../config/index.js';

export function signAccessToken(accountId) {
  const accessToken = sign(
    { _id: accountId },
    jwtSecretKey,
    {
      expiresIn: '1h',
    }
  );
  return accessToken;
}
export function signRefreshToken(accountId) {
  const refreshToken = sign(
    { _id: accountId },
    refreshTokenSecretKey,
    {
      expiresIn: '7d',
    }
  );
  return refreshToken;
}
export function signConfirmCodeToken(accountId, confirmCode) {
  const confirmCodeToken = sign(
    { _id: accountId, code: confirmCode },
    jwtSecretKey,
    {
      expiresIn: '5m',
    }
  );
  return confirmCodeToken;
}

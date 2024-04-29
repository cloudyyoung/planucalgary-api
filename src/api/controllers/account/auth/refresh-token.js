import { Token } from '../../../../models/index.js';
import { validateRefreshToken } from '../../../validators/account.validator.js';
import { errorHelper, getText, ipHelper, signAccessToken, signRefreshToken } from '../../../../utils/index.js';
import { refreshTokenSecretKey } from '../../../../config/index.js';
import pkg from 'jsonwebtoken';
const { verify } = pkg;

export default async (req, res) => {
  const { error } = validateRefreshToken(req.body);
  if (error) return res.status(400).json(errorHelper('00059', req, error.details[0].message));

  try {
    req.account = verify(req.body.refreshToken, refreshTokenSecretKey)
  } catch (err) {
    return res.status(400).json(errorHelper('00063', req, err.message));
  }

  const accountToken = await Token.findOne({ accountId: req.account._id }).catch((err) => {
    return res.status(500).json(errorHelper('00060', req, err.message));
  });

  if (accountToken.refreshToken !== req.body.refreshToken || !accountToken)
    return res.status(404).json(errorHelper('00061', req));

  if (accountToken.expiresIn <= Date.now() || !accountToken.status)
    return res.status(400).json(errorHelper('00062', req));

  const accessToken = signAccessToken(req.account._id);
  const refreshToken = signRefreshToken(req.account._id);

  await Token.updateOne({ accountId: req.account._id },
    {
      $set: {
        refreshToken: refreshToken,
        createdByIp: ipHelper(req),
        createdAt: Date.now(),
        expires: Date.now() + 604800000,
        status: true
      },
    }
  ).catch((err) => {
    return res.status(500).json(errorHelper('00064', req, err.message));
  });

  return res.status(200).json({
    resultMessage: { en: getText('en', '00065'), tr: getText('tr', '00065') },
    resultCode: '00065', accessToken, refreshToken
  });
};

/**
 * @swagger
 * /account/refresh-token:
 *    post:
 *      summary: Refreshes the Access Token
 *      requestBody:
 *        description: Valid Refresh Token
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                refreshToken:
 *                  type: string
 *      tags:
 *        - Account
 *      responses:
 *        "200":
 *          description: The token is refreshed successfully.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          resultMessage:
 *                              $ref: '#/components/schemas/ResultMessage'
 *                          resultCode:
 *                              $ref: '#/components/schemas/ResultCode'
 *                          accessToken:
 *                              type: string
 *                          refreshToken:
 *                              type: string
 *        "400":
 *          description: Please provide refresh token.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 *        "500":
 *          description: An internal server error occurred, please try again.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 */
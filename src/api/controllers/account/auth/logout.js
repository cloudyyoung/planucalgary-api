import { Token } from '../../../../models/index.js';
import { errorHelper, getText, logger } from '../../../../utils/index.js';

export default async (req, res) => {
  await Token.updateOne({ accountId: req.account._id },
    {
      $set: { status: false, expiresIn: Date.now() }
    })
    .catch(err => {
      return res.status(500).json(errorHelper('00049', req, err.message));
    });

  logger('00050', req.account._id, getText('en', '00050'), 'Info', req);
  return res.status(200).json({
    resultMessage: { en: getText('en', '00050'), tr: getText('tr', '00050') },
    resultCode: '00050'
  });
};

/**
 * @swagger
 * /account/logout:
 *    post:
 *      summary: Logout the Account
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *      tags:
 *        - Account
 *      responses:
 *        "200":
 *          description: Successfully logged out.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 *        "401":
 *          description: Invalid token.
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
import { Account } from '../../../../models/index.js';
import { validateSendVerificationCode } from '../../../validators/account.validator.js';
import { generateRandomCode, sendCodeToEmail, errorHelper, logger, getText, signConfirmCodeToken } from '../../../../utils/index.js';

export default async (req, res) => {
  const { error } = validateSendVerificationCode(req.body);
  if (error) return res.status(400).json(errorHelper('00029', req, error.details[0].message));

  const account = await Account.findOne({ email: req.body.email, isActivated: true })
    .catch((err) => {
      return res.status(500).json(errorHelper('00030', req, err.message));
    });

  if (!account) return res.status(404).json(errorHelper('00036', req));

  const emailCode = generateRandomCode(4);
  await sendCodeToEmail(req.body.email, account.name, emailCode, account.language, 'newCode', req, res);

  account.isVerified = false;

  await account.save().catch((err) => {
    return res.status(500).json(errorHelper('00037', req, err.message));
  });

  const confirmCodeToken = signConfirmCodeToken(account._id, emailCode);
  logger('00048', account._id, getText('en', '00048'), 'Info', req);
  return res.status(200).json({
    resultMessage: { en: getText('en', '00048'), tr: getText('tr', '00048') },
    resultCode: '00048',
    confirmToken: confirmCodeToken
  });
};

/**
 * @swagger
 * /account/send-verification-code:
 *    post:
 *      summary: Sends a verification code to the account.
 *      requestBody:
 *        description: Email of the account
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *      tags:
 *        - Account
 *      responses:
 *        "200":
 *          description: The code is sent to your email successfully.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          resultMessage:
 *                              $ref: '#/components/schemas/ResultMessage'
 *                          resultCode:
 *                              $ref: '#/components/schemas/ResultCode'
 *                          confirmToken:
 *                              type: string
 *        "400":
 *          description: Please provide a valid email!
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
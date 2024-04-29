import { Account } from '../../../models/index.js';
import { errorHelper } from '../../../utils/index.js';

export async function checkAdmin(req, res, next) {
  const account = await Account.findById(req.account._id).select('type')
    .catch(err => {
      return res.status(500).json(errorHelper('00016', req, err.message));
    });

  if (account.type !== 'admin') return res.status(403).json(errorHelper('00017', req));

  next();
}
export async function checkCreator(req, res, next) {
  const account = await Account.findById(req.account._id).select('type')
    .catch(err => {
      return res.status(500).json(errorHelper('00018', req, err.message));
    });

  if (account.type !== 'creator' && account.type !== 'admin')
    return res.status(403).json(errorHelper('00019', req));

  next();
}
export async function checkReader(req, res, next) {
  const account = await Account.findById(req.account._id).select('type')
    .catch(err => {
      return res.status(500).json(errorHelper('00020', req, err.message));
    });

  if (account.type === 'account') return res.status(403).json(errorHelper('00021', req));

  next();
}

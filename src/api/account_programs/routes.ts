import { Router } from 'express';
import { getAccountPrograms, AddAccountPrograms } from './controller';

const router = Router();

router.get('/', getAccountPrograms);
router.post('/', AddAccountPrograms)

export default router
export { router }
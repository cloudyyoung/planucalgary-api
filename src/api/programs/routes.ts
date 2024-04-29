import { Router } from 'express';
import { getPrograms } from './controller';

const router = Router();

router.get('/', getPrograms);


export default router
export { router }
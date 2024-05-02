import { Router } from 'express';
import { getAccountCourses, AddAccountCourses } from './controller';

const router = Router();

router.get('/', getAccountCourses);
router.post('/', AddAccountCourses)

export default router
export { router }
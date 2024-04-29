import { Router } from 'express';
import { changePassword, deleteAccount, editAccount, forgotPassword, getAccount, login, logout, refreshToken, register, sendVerificationCode, verifyEmail } from '../controllers/account/index.js';
import { auth, imageUpload } from '../middlewares/index.js';

const router = Router();

// AUTH
router.post('/', register);
router.post('/login', login);
router.post('/logout', auth, logout);
router.post('/verify-email', verifyEmail);
router.post('/refresh-token', refreshToken);
router.post('/forgot-password', auth, forgotPassword);
router.post('/send-verification-code', sendVerificationCode);

// EDIT
router.post('/change-password', auth, changePassword);
router.put('/', auth, imageUpload, editAccount);

router.get('/', auth, getAccount);
router.delete('/', auth, deleteAccount);

export default router
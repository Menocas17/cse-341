import { Router } from 'express';

const router = Router();

router.get('/get-all-users');

router.post('/create');

router.put('/update/:user_id');

router.delete('/delete/:user_id');

export default router;

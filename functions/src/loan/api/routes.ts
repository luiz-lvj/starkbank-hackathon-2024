import { Router } from 'express';
import LoanRouter from './routes/loan';

const router = Router();

router.get('/ping', (_, res) => res.send('pong'));

router.use('/loan', LoanRouter);

export default router;

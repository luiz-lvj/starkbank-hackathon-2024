import { Router } from 'express';
import SocialContractRoutes from './routes/socialContract';

const router = Router();

router.get('/ping', (req, res) => res.send('pong'));

router.use('/socialContract', SocialContractRoutes);

export default router;

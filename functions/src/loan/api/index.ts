import * as cors from 'cors';
import * as express from 'express';
import LoanRouter from './routes/loan';

const app = express();

app.use(cors());
app.use(express.json());
app.use(LoanRouter);

export default app;

import * as express from 'express';
import loanController from '../controller/loan';

const LoanRouter = express.Router();

// Route for creating a loan
LoanRouter.post('/create', loanController.createLoan);

export default LoanRouter;

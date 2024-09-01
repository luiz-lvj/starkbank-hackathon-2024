import { Request, Response } from 'express';
import LoanService from '../services/loan';

export const createLoan = async (req: Request, res: Response) => {
    try {
        const loanData = await LoanService.createLoan(req.body);

        return res.status(200).json(loanData);
    } catch (error) {
        console.error('Error creating loan:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const loanController = {
    createLoan,
};

export default loanController;

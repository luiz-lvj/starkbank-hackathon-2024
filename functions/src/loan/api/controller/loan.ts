import { Request, Response } from 'express';
import LoanService from '../services/loan';

export const createLoan = async (req: Request, res: Response) => {
    try {
        const { fileUri } = req.body;

        if (!fileUri) {
            return res.status(400).json({ error: 'File URI is required' });
        }

        const loanData = await LoanService.createLoan(fileUri);
        
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

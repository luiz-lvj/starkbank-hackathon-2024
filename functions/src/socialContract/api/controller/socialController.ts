import { Request, Response } from 'express';
import socialContractService from '../services/socialContract';

async function extractSocialContractInformation(req: Request, res: Response) {
    try {
        const { fileUri } = req.body;

        if (!fileUri) {
            return res.status(400).json({ error: 'File URI is required' });
        }

        const extractedInformation = await socialContractService.extractSocialContractInformations(fileUri);

        return res.status(200).json(extractedInformation);
    } catch (error) {
        console.error('Error extracting social contract information:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const socialController = {
    extractSocialContractInformation,
};

export default socialController;

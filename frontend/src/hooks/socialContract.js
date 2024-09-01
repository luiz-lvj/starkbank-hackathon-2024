import { useCallback } from 'react';
import SocialContractClient from '../clients/socialContract/index.js';

export const useSocialContractClient = () => {
    const extractSocialContract = useCallback(async (fileUri) => {
        try {
            const result = await SocialContractClient.extractSocialContract(fileUri);
            return result;
        } catch (error) {
            console.error('Erro ao extrair contrato social:', error);
            throw error;
        }
    }, []);

    const requestLoan = useCallback(async (amount) => {
        try {
            // Aqui você deve implementar a lógica para solicitar um empréstimo
            // Por enquanto, vamos apenas simular uma chamada de API
            console.log(`Solicitando empréstimo de R$ ${amount}`);
            // Simule uma chamada de API com um atraso
            await new Promise(resolve => setTimeout(resolve, 1000));
            return { success: true, message: 'Empréstimo solicitado com sucesso' };
        } catch (error) {
            console.error('Erro ao solicitar empréstimo:', error);
            throw error;
        }
    }, []);

    return {
        extractSocialContract,
        requestLoan,
    };
};

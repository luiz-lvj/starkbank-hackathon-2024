import { useCallback } from 'react';
import SocialContractClient from '../clients/socialContract';
import LoanClient from '../clients/loan';
import { collection, addDoc, getFirestore } from 'firebase/firestore';

// Aqui ficarão todas as funções que fazem requests para a API
export const useApiClient = () => {
    /**
     * Extrai o contrato social de um arquivo PDF
     * @param {string} fileUri - O URI do arquivo PDF
     * @returns {Promise<Object>} Uma promessa que resolve com o resultado da extração
     */
    const extractSocialContract = async (fileUri) => {
        try {
            const result = await SocialContractClient.extractSocialContract(fileUri);
            return result;
        } catch (error) {
            console.error('Erro ao extrair contrato social:', error);
            throw error;
        }
    };
    
    const requestLoan = async (amount, fileUri) => {
        if (fileUri !== undefined) {
            const socialContract = await extractSocialContract(fileUri);
            console.log(socialContract);
            const result = await LoanClient.requestLoan({ requestAmount: amount, socialContract: socialContract });
            return result;
        } else {
            const result = await LoanClient.requestLoan({ requestAmount: amount });
            return result;
        }
    };

    const saveFilter = async (filter) => {
        const db = getFirestore();
        await addDoc(collection(db, "filters"), filter);
        return { success: true, message: 'Filtro salvo com sucesso' };
    };

    return {
        extractSocialContract: useCallback(extractSocialContract, []),
        requestLoan: useCallback(requestLoan, []),
        saveFilter: useCallback(saveFilter, []),
    };
};

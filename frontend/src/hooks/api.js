import { useCallback } from 'react';
import SocialContractClient from '../clients/socialContract/index.js';

/**
 * @typedef {Object} LoanConfig
 * @property {string} [fileUri] - O URI do arquivo do contrato social (opcional)
 */

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
    
    /**
     * Solicita um empréstimo
     * @param {number} amount - O valor do empréstimo solicitado
     * @param {LoanConfig} config - Configurações adicionais do empréstimo
     * @returns {Promise<Object>} Uma promessa que resolve com o resultado da solicitação
     */
    const requestLoan = async (amount, config) => {
        if (config.fileUri) {
            const socialContract = await extractSocialContract(config.fileUri);
            console.log(socialContract);
        }

        // TODO: Request loan
        return { success: true, message: 'Empréstimo solicitado com sucesso' };
    };

    return {
        extractSocialContract: useCallback(extractSocialContract, []),
        requestLoan: useCallback(requestLoan, []),
    };
};

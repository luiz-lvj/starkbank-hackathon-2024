import axios from 'axios';

const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;
const LOAN_API_URL = `${BACKEND_BASE_URL}/loan-api`;

/**
 * @typedef {Object} CreateLoanInput
 * @property {string} [fileUri] - The URI of the file.
 * @property {number} requestAmount - The amount requested for the loan.
 */
const createLoan = async (input) => {
    const response = await axios.request({
        method: 'POST',
        url: `${LOAN_API_URL}/loan/create`,
        data: {
            ...input,
        },
    });
    return response.data;
}

const LoanClient = {
    createLoan,
}

export default LoanClient;

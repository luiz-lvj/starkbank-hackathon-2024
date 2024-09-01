import axios from 'axios';

const BACKEND_BASE_URL = 'https://us-central1-platao-stark-hackathon.cloudfunctions.net/';
const LOAN_API_URL = `${BACKEND_BASE_URL}/loan-api`;

/**
 * @typedef {Object} CreateLoanInput
 * @property {string} [fileUri] - The URI of the file.
 * @property {number} requestAmount - The amount requested for the loan.
 */
const createLoan = async (input) => {

    console.log('input', input);
    const response = await axios.request({
        method: 'POST',
        url: `${LOAN_API_URL}/create`,
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

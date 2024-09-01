import axios from 'axios';

const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;
const LOAN_API_URL = `${BACKEND_BASE_URL}/loan-api`;

const createLoan = async () => {
    const response = await axios.request({
        method: 'POST',
        url: `${LOAN_API_URL}/loan/create`,
        data: {
            // TODO: Add data to create a loan
        },
    });
    return response.data;
}

const LoanClient = {
    createLoan,
}

export default LoanClient;

import axios from 'axios';

const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;  
const SOCIAL_CONTRACT_API_URL = `${BACKEND_BASE_URL}/socialContract-api`;

const extractSocialContract = async (fileUri) => {
    const response = await axios.request({
        method: 'POST',
        url: `${SOCIAL_CONTRACT_API_URL}/extract`,
        data: {
            fileUri: fileUri,
        },
    });
    return response.data;
}

const SocialContractClient = {
    extractSocialContract,
}

export default SocialContractClient;

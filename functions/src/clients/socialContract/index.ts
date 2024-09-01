import axios from 'axios';

const SOCIAL_CONTRACT_API_URL = `https://us-central1-platao-stark-hackathon.cloudfunctions.net/loan-api/socialContract-api`;

const extractSocialContract = async (fileUri: string) => {
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

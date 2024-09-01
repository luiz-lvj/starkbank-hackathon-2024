import axios from 'axios';
import { SOCIAL_CONTRACT_API_URL } from './consts';

const extractSocialContract = async (fileUri: string) => {
    const response = await axios.request({
        method: 'POST',
        url: `${SOCIAL_CONTRACT_API_URL}/socialContract`,
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

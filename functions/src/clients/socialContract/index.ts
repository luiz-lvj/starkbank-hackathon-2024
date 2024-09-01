import axios from 'axios';
import { SOCIAL_CONTRACT_API_URL } from './consts';

const getSocialContract = async (workspaceId: string) => {
    const response = await axios.request({
        method: 'POST',
        url: `${SOCIAL_CONTRACT_API_URL}/socialContract`,
        data: {
            workspaceId,
        },
    });
    return response.data;
}

const SocialContractClient = {
    getSocialContract,
}

export default SocialContractClient;

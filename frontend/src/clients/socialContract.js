import axios from 'axios';


const extractSocialContract = async (fileUri) => {

    console.log('fileUri', fileUri);

    const response = await axios.request({
        method: 'POST',
        url: `https://us-central1-platao-stark-hackathon.cloudfunctions.net/socialContract-api/socialContract/extract`,
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

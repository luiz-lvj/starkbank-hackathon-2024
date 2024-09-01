import axios from 'axios';

const getStarkScore = async () => {
    const response = await axios.request({
        method: 'GET',
        url: `https://prophetstark-931482641097.us-central1.run.app/starkscore/4800539376222208`,
    });

    console.log('response', response.data);
    
    return response.data;
}

const PrevisionModelClient = {
    getStarkScore,
}

export default PrevisionModelClient;

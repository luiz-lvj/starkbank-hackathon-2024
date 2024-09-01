import * as starkbank from 'starkbank';

const STARK_ORG_ID = '<STARK_ORG_ID>';
const STARK_BANK_PRIVATE_KEY = '<STARK_BANK_PRIVATE_KEY>';

const resolveGenerator = async <T>(generator: T[]): Promise<T[]> => {
    const result = [];

    for await (const item of generator) {
        result.push(item);
    }

    return result;
};

const setOrganization = (workspaceId?: string) => {
    const organization = new starkbank.Organization({
        environment: 'sandbox',
        id: STARK_ORG_ID,
        privateKey: STARK_BANK_PRIVATE_KEY,
        workspaceId,
    });

    starkbank.setUser(organization);

    return organization;
};

const StarkbankUtils = {
    resolveGenerator,
    setOrganization,
};

export default StarkbankUtils;

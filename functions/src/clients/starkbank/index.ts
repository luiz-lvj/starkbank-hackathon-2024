import * as starkbank from 'starkbank';
import StarkbankUtils from './utils';

async function getBalance(workspaceId: string) {
    StarkbankUtils.setOrganization(workspaceId);

    const balance = await starkbank.balance.get();

    return balance;
}

const StarkbankClient = {
    getBalance,
};

export default StarkbankClient;

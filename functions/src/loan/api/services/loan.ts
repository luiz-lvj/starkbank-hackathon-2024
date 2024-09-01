import SocialContractClient from "../../../clients/socialContract";
import { calculateLoanData, getMatch } from "./utils";

export interface Filters {
    segment?: string;
    minimumTpv?: number;
    maximumTpv?: number;
    minimumAverageTicket?: number;
    maximumAverageTicket?: number;
    minimumStarkScore?: number;
    type?: string;
}

async function createLoan(fileUri: string) {
    const socialContract = await SocialContractClient.extractSocialContract(fileUri);

    // Should calculate stark score here
    const starkScore = 150;

    const companyData = {
        tpv: 1000,
        averageTicket: 100,
    };

    const hasLoanMatch = await getMatch(starkScore, companyData, socialContract);

    if (hasLoanMatch) {
        const loanData = await calculateLoanData(starkScore, companyData, socialContract);
        
        return {
            hasLoanMatch: true,
            ...loanData,
        }
    } else {
        return {
            hasLoanMatch: false,
        }
    }
}

const LoanService = {
    createLoan,
}

export default LoanService;

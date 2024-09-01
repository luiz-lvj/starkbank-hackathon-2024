import { calculateLoanData, getMatch } from "./utils";
import SocialContractClient from "../../../clients/socialContract";

export interface Filters {
    segment?: string[];
    minimumTpv?: number;
    maximumTpv?: number;
    minimumInvestmentValue?: number;
    maximumInvestmentValue?: number;
    socialCapital?: number;
    minimumStarkScore?: number;
    type?: string;
    noLiability?: boolean;
}

export interface CreateLoanInput {
    fileUri?: string;
    requestAmount: number;
}

export interface CompanyData {
    tpv: number;
    requestAmount: number;
}

async function createLoan(input: CreateLoanInput) {
    const { fileUri, requestAmount } = input;

    let socialContract: any;

    if (fileUri) {
        socialContract = await SocialContractClient.extractSocialContract(fileUri);
    }

    // Should calculate stark score here
    const starkScore = 150;

    const companyData = {
        tpv: 1000,
        averageTicket: 100,
        requestAmount,
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

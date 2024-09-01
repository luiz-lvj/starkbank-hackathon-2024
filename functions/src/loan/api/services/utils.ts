import * as admin from "firebase-admin";
import { CompanyData, Filters } from "./loan";
import { logger } from "firebase-functions/v2";

const db = admin.firestore();

// TODO: Use requested amount to get the match
export async function getMatch(starkScore: number, companyData: CompanyData, socialContract?: { atividadesEconomicas: string[] } & any) {
    const listOfFunds = await listFundsSpecifications();

    logger.log('List of funds:', listOfFunds);

    listOfFunds.forEach(fund => {
        logger.log('Checking fund:', fund);
        logger.log('Segment match:', !getFundSpecification(fund.segment ?? [], socialContract?.atividadesEconomicas));
        logger.log('Minimum TPV check:', fund.minimumTpv ? companyData.tpv < fund.minimumTpv : 'N/A');
        logger.log('Maximum TPV check:', fund.maximumTpv ? companyData.tpv > fund.maximumTpv : 'N/A');
        logger.log('Minimum Stark Score check:', fund.minimumStarkScore ? starkScore < fund.minimumStarkScore : 'N/A');
        logger.log('Type match:', fund.type ? fund.type !== socialContract?.tipoEmpresa : 'N/A');
        logger.log('No Liability check:', fund.noLiability === (socialContract?.temPassivo ?? false));
    });

    return listOfFunds.some(fund => {
        if (!getFundSpecification(fund.segment ?? [], socialContract?.atividadesEconomicas)) return false;
        if (fund.minimumTpv && companyData.tpv < fund.minimumTpv) return false;
        if (fund.maximumTpv && companyData.tpv > fund.maximumTpv) return false;
        if (fund.minimumStarkScore && starkScore < fund.minimumStarkScore) return false;
        if (fund.type && fund.type !== socialContract?.tipoEmpresa) return false;
        if (fund.noLiability !== (socialContract?.temPassivo ?? false)) return false;
        return true;
    });
}

export async function calculateLoanData(starkScore: number, companyData: any, socialContract: { atividadesEconomicas: string[] } & any) {
    console.log('performing some calculations...');

    return {
        loanAmount: 1000,
        loanInterestRate: 0.1,
        loanTerm: 12,
    };
}

export async function listFundsSpecifications() {
    const funds = await db.collection('filters').get();
    return funds.docs.map(doc => doc.data() as Filters);
}

function getFundSpecification(segmentSearch: string[], activitySearch: string[]) {
    return segmentSearch.length > 0 && activitySearch
        .some((activity: string) => segmentSearch.map(segment => segment.toLowerCase()).includes(activity.toLowerCase()));
}

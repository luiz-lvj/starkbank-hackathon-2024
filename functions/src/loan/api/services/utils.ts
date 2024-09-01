import * as admin from "firebase-admin";
import { CompanyData, Filters } from "./loan";

const db = admin.firestore();

// TODO: Use requested amount to get the match
export async function getMatch(starkScore: number, companyData: CompanyData, socialContract?: { atividadesEconomicas: string[] } & any) {
    const listOfFunds = await listFundsSpecifications();

    return listOfFunds.some(fund => {
        if (!getFundSpecification(fund.segment ?? [], socialContract?.atividadesEconomicas)) return false;
        if (fund.minimumTpv && companyData.tpv < fund.minimumTpv) return false;
        if (fund.maximumTpv && companyData.tpv > fund.maximumTpv) return false;
        if (fund.minimumStarkScore && starkScore < fund.minimumStarkScore) return false;
        if (fund.type && fund.type !== socialContract?.tipoEmpresa) return false;
        if (fund.minimumInvestmentValue && companyData.requestAmount < fund.minimumInvestmentValue) return false;
        if (fund.noLiability === (socialContract?.temPassivo ?? false)) return false;
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
    const funds = await db.collection('funds').get();
    return funds.docs.map(doc => doc.data() as Filters);
}

function getFundSpecification(segmentSearch: string[], activitySearch: string[]) {
    return segmentSearch.length > 0 && activitySearch
        .some((activity: string) => segmentSearch.includes(activity));
}
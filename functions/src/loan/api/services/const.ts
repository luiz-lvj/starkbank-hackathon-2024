import { Filters } from "./loan";

export const listFundsSpecifications = (): Filters[] => {
    return [
        {
            segment: ['Comida'],
            minimumTpv: 1000,
            maximumTpv: 10000,
            minimumInvestmentValue: 5000,
            socialCapital: 20000,
            minimumStarkScore: 150,
            type: 'Small Business',
            noLiability: true,
        },
        {
            segment: ['Tech'],
            minimumTpv: 2000,
            maximumTpv: 15000,
            minimumInvestmentValue: 7000,
            socialCapital: 30000,
            minimumStarkScore: 250,
            type: 'Startup',
            noLiability: false,
        },
        {
            segment: ['Varejo'],
            minimumTpv: 500,
            maximumTpv: 8000,
            minimumInvestmentValue: 3000,
            socialCapital: 10000,
            minimumStarkScore: 100,
            type: 'Enterprise',
            noLiability: true,
        }
    ];
}
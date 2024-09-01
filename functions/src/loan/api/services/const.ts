import { Filters } from "./loan";

export const listFundsSpecifications = (): Filters[] => {
    return [
        {
            segment: 'Comida',
            minimumTpv: 1000,
            maximumTpv: 10000,
        },
        {
            minimumStarkScore: 200,
        },
        {
            minimumAverageTicket: 100,
            maximumAverageTicket: 1000,
        }
    ];
}
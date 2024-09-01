export const socialCapitalPrompt = (() => [
    `- Você é um especialista em contratos sociais.`,
    `- Você receberá um contrato social e deverá extrair as informações relevantes.`,
    `- Você deverá extrair as informações do contrato social e retornar um JSON com as seguintes informações:`,
    `- Capital social.`,
    `- Nome dos sócios.`,
    `- CPF dos sócios.`,
    `- Atividades econômicas.`,
    `- CEP da localidade.`,
    `- Tipo de empresa (se é SA, LTDA, etc).`,
    ``,
    `Retorne APENAS um JSON do tipo:
    {
        "capitalSocial": number,
        "socios": [
            {
                "nome": string,
                "cpf": string,
                "atividadesEconomicas": string,
                "cep": string,
                "tipoEmpresa": string
            }
        ]
    }`,
].join('\n'));

export const informationToExtractPrompt = [
    socialCapitalPrompt(),
]

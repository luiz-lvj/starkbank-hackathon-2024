import model from "../../../../_common/model";
import { informationToExtractPrompt } from "./consts";
import { buildHistory } from "./utils";

async function extractSocialContractInformations(fileUri: string) {
    const buildPrompts = informationToExtractPrompt.map(prompt => buildHistory(prompt, fileUri));

    const chats = buildPrompts.map(prompt => model.startChat({ history: prompt }));

    const results = await Promise.all(chats.map(chat => chat.sendMessage('Olá, como posso ajudar?')));

    return results;
}

const socialContractService = {
    extractSocialContractInformations,
}

export default socialContractService;

import { Content } from "@google-cloud/vertexai";
import model from "../../../../_common/model";
import { informationToExtractPrompt } from "./consts";
import { buildHistory } from "./utils";

async function extractSocialContractInformations(fileUri: string) {
    const buildPrompts = informationToExtractPrompt.map(prompt => buildHistory(prompt, fileUri));

    const chats = buildPrompts.map(prompt => model.startChat({ history: prompt }));

    const results = await Promise.all(chats.map(chat => chat.sendMessage('Olá, como posso ajudar?')));

    const resultsContent = results.map(result => result.response);

    const contents = resultsContent.map(content => content.candidates
        ?.map(candidate => candidate.content).flat()).filter(content => content !== undefined).flat() as Content[];

    const dataString = contents.map(content => content.parts?.map(part => part.text)).flat() as string[];

    console.log('contents', contents.map(content => content.parts?.map(part => part.text)));

    const dataObj = JSON.parse(dataString.join(''));

    return dataObj;
}

const socialContractService = {
    extractSocialContractInformations,
}

export default socialContractService;

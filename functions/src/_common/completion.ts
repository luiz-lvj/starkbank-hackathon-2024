import model from "./model";
import { Content } from "firebase/vertexai-preview";

async function getCompletionPdf(fileUri: string, query: string, history?: Content[]) {
    // Provide a prompt that contains text
    const chat = model.startChat({ history });

    // To generate text output, call generateContent with the text input
    const result = await chat.sendMessage(query);

    const modelResponse = result.response;

    return modelResponse;
}

export default getCompletionPdf;

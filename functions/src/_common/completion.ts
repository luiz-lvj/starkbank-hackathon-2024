import { Content } from "@google-cloud/vertexai";
import model from "./model";

async function getCompletionPdf(query: string, history?: Content[]) {
    // Provide a prompt that contains text
    const chat = model.startChat({ history });

    // To generate text output, call generateContent with the text input
    const result = await chat.sendMessage(query);

    const modelResponse = result.response;

    if (!modelResponse.candidates) return;

    return modelResponse;
}

export default getCompletionPdf;

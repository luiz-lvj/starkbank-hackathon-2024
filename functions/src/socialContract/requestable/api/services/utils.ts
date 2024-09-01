import { Content } from "@google-cloud/vertexai";

export function buildHistory(prompt: string, fileUri: string): Content[] {
    const systemContent = {
        role: 'system',
        parts: [{ text: prompt }]
    };

    const userContent = {
        role: 'user',
        parts: [{ fileData: { mimeType: 'application/pdf', fileUri } }]
    };

    return [systemContent, userContent];
}

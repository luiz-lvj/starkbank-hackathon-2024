import { Content, Part } from "@google-cloud/vertexai";

export function buildHistory(prompt: string, fileUri: string): Content[] {
    const filePart: Part[] = [{ fileData: { mimeType: 'application/pdf', fileUri } }];

    const textPart: Part[] = [{ text: prompt }];

    return [
        {
            role: 'user',
            parts: textPart
        },
        {
            role: 'user',
            parts: filePart
        }
    ];
}

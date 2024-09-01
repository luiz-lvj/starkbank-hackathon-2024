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

export function sanitizeString(text: string) {
    const startIndex = text.indexOf('{');
    const endIndex = text.lastIndexOf('}');
    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
        return text.substring(startIndex, endIndex + 1);
    }
    return text;
}

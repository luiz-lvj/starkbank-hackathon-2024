import { getVertexAI, getGenerativeModel } from "firebase/vertexai-preview";
import app from "./app";

const vertexAI = getVertexAI(app);

// Initialize the generative model with a model that supports your use case
// Gemini 1.5 models are versatile and can be used with all API capabilities
const model = getGenerativeModel(vertexAI, {
    model: "gemini-1.5-flash",
    systemInstruction: 'Você é um assistente que ajuda a extrair informações de contratos'
});

export default model;

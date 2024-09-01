import { VertexAI } from "@google-cloud/vertexai";

const projectId = 'platao-hackathon';

const vertexAI = new VertexAI({project: projectId, location: 'us-central1'});

const model = vertexAI.getGenerativeModel({
  model: 'gemini-1.5-flash-001',
});


export default model;

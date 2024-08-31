import * as functions from 'firebase-functions'

export const hackathonTest = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hackathon test!");
});
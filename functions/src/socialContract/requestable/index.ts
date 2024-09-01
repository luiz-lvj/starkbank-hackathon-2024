import * as funcitonsv2 from 'firebase-functions/v2';

export const api = funcitonsv2.https.onRequest(
    {
        minInstances: 1,
        concurrency: 100,
        memory: '512MiB',
    },
    (req, res) => import('./api').then(m => m.default(req, res))
);

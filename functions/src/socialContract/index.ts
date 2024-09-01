import * as funcitonsv2 from 'firebase-functions/v2';

export const api = funcitonsv2.https.onRequest(
    {
        memory: '512MiB',
    },
    (req, res) => import('./api').then(m => m.default(req, res))
);

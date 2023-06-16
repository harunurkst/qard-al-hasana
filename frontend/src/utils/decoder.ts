export const decoderFunction = (accesssToken: string) => {
    const de = require('jsonwebtoken');
    const deDone = de.decode(accesssToken);
    return deDone;
};

import de from 'jsonwebtoken';

export const decoderFunction = (accesssToken: string) => {
    const deDone = de.decode(accesssToken);
    return deDone;
};

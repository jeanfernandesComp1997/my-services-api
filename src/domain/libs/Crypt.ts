import * as crypto from 'crypto';
import 'dotenv/config'

const IV_LENGTH = crypto.randomBytes(16);
const ENCRYPTION_KEY = process.env?.SECRET32BYTE ?? "";

export const encrypt = (value: string) => {
    const cipher = crypto.createCipheriv('aes-256-ctr', ENCRYPTION_KEY, IV_LENGTH);
    const encrypted = Buffer.concat([cipher.update(value), cipher.final()]);

    return {
        iv: IV_LENGTH.toString('hex'),
        content: encrypted.toString('hex')
    };
};

export const decrypt = (hash: any) => {
    const decipher = crypto.createDecipheriv('aes-256-ctr', ENCRYPTION_KEY, Buffer.from(hash.iv, 'hex'));
    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

    return decrpyted.toString();
};
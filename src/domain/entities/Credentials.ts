export class Credentials {
    token: string;
    expiresIn: string;

    constructor(props) {
        Object.assign(this, props);
    }
}
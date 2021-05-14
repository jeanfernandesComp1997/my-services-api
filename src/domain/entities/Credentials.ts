export class Credentials {
    token!: string;
    expiresIn!: string;

    constructor(props: any) {
        Object.assign(this, props);
    }
}
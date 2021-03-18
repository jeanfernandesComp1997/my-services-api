import { EntityBase } from './EntityBase';

export class User extends EntityBase {
    name: string;
    email: string;
    password: string;
    document: string;
    corporateDocument: string;
    corporateName: string;
    passwordResetToken: string;
    passwordResetExpires: Date;

    constructor(props) {
        super(props.id ? props.id : null);
        Object.assign(this, props);

        this.validate();
    }

    validate() {
        if (this.name === '' || this.name === null || this.name === undefined)
            this._errors.push('Name is required!');

        if (this.email === '' || this.email === null || this.email === undefined)
            this._errors.push('Email is required!');

        if (this.password === '' || this.password === null || this.password === undefined)
            this._errors.push('Password is required!');
    }
}
import { EntityBase } from './base/EntityBase';

export abstract class Person extends EntityBase<Person> {
    private name: string;
    get _name(): string { return this.name }

    private email: string;
    get _email(): string { return this.email }

    private password: string;
    get _password(): string { return this.password }

    private document: string;
    get _document(): string { return this.document }

    private corporateDocument: string;
    get _corporateDocument(): string { return this.corporateDocument }

    private corporateName: string;
    get _corporateName(): string { return this.corporateName }

    private passwordResetToken: string;
    get _passwordResetToken(): string { return this.passwordResetToken }

    private passwordResetExpires: Date;
    get _passwordResetExpires(): Date { return this.passwordResetExpires }

    constructor(props) {
        super(props.id ? props.id : null);

        Object.assign(this, props);
    }

    setPassword(value: string) { this.password = value }

    setDocument(value: string) { this.document = value }

    setCorporateDocument(value: string) { this.corporateDocument = value }

    setCorporateName(value: string) { this.corporateName = value }

    setPasswordResetToken(value: string) { this.passwordResetToken = value }

    setPasswordResetExpires(value: Date) { this.passwordResetExpires = value }
}
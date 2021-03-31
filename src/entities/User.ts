import { EntityBase, ParamsTypes } from './base/EntityBase';
import { EntityResult } from './result/EntityResult';

export class User extends EntityBase<User> {
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

    private constructor(props) {
        super(props.id ? props.id : null);

        Object.assign(this, props);
    }

    static createUser(props): EntityResult<User> {
        const validateResult = this.validateParameters([
            {
                keyName: 'name',
                type: ParamsTypes.string,
                value: props?.name
            },
            {
                keyName: 'email',
                type: ParamsTypes.string,
                value: props?.email
            },
            {
                keyName: 'password',
                type: ParamsTypes.string,
                value: props?.password
            }
        ]);

        if (!validateResult.isSuccess)
            return EntityResult.fail<User>(validateResult.notifications);

        return EntityResult.ok<User>(new User(props));
    }

    setPassword(value: string) { this.password = value }

    setDocument(value: string) { this.document = value }

    setCorporateDocument(value: string) { this.corporateDocument = value }

    setCorporateName(value: string) { this.corporateName = value }

    setPasswordResetToken(value: string) { this.passwordResetToken = value }

    setPasswordResetExpires(value: Date) { this.passwordResetExpires = value }
}
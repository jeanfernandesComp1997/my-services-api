export interface ICreateUserRequestDTO {
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly document: string;
    readonly corporateDocument: string;
    readonly corporateName: string;
}
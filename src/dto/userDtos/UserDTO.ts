export class UserDTO {
    id: string;
    name: string;
    email: string;
    password: string;
    document: string;
    corporateDocument: string;
    corporateName: string;

    constructor(props) {
        this.id = props.userId;
        this.name = props.name;
        this.email = props.email;
        this.password = props.password;
        this.document = props.document;
        this.corporateName = props.corporateName;
    }
}
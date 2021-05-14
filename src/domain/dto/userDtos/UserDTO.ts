import { AddressDTO } from "./AddressDTO";

export class UserDTO {
    id: string;
    name: string;
    email: string;
    password: string;
    document: string;
    corporateDocument: string;
    corporateName: string;
    address: Array<AddressDTO>;

    constructor(props: any) {
        this.id = props.userId;
        this.name = props.name;
        this.email = props.email;
        this.password = props.password;
        this.document = props.document;
        this.corporateDocument = props.corporateDocument;
        this.corporateName = props.corporateName;
        this.address = [];

        if (props?.id) {
            this.address.push(new AddressDTO({
                id: props.id,
                userId: props.userId,
                country: props.country,
                state: props.state,
                city: props.city,
                neighborhood: props.neighborhood,
                street: props.street,
                number: props.number
            }));
        }
    }
}
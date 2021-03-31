import { AddressDTO } from "./AddressDTO";

export class UserAddressDTO {
    id: string;
    name: string;
    email: string;
    password: string;
    document: string;
    corporateDocument: string;
    corporateName: string;
    address: Array<AddressDTO>;

    constructor(props) {
        this.id = props.userId;
        this.name = props.name;
        this.email = props.email;
        this.password = props.password;
        this.document = props.document;
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
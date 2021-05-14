export class AddressDTO {
    id: string;
    userId: string;
    country: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    number: string;

    constructor(props: any) {
        this.id = props.id;
        this.userId = props.userId;
        this.country = props.country;
        this.state = props.state;
        this.city = props.city;
        this.neighborhood = props.neighborhood;
        this.street = props.street;
        this.number = props.number;
    }
}
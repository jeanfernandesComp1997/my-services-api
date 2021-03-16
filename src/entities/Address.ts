import { EntityBase } from './EntityBase';

export class Address extends EntityBase {
    userId: string;
    country: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    number: string;

    constructor(props) {
        super(props.id ? props.id : null);

        Object.assign(this, props);

        this.validate();
    }

    validate() {
        if (this.userId === '' || this.userId === null || this.userId === undefined)
            this._errors.push('UserId is required!');

        if (this.country === '' || this.country === null || this.country === undefined)
            this._errors.push('Country is required!');

        if (this.state === '' || this.state === null || this.state === undefined)
            this._errors.push('State is required!');

        if (this.city === '' || this.city === null || this.city === undefined)
            this._errors.push('City is required!');

        if (this.neighborhood === '' || this.neighborhood === null || this.neighborhood === undefined)
            this._errors.push('Neighborhood is required!');

        if (this.street === '' || this.street === null || this.street === undefined)
            this._errors.push('Street is required!');

        if (this.number === '' || this.number === null || this.number === undefined)
            this._errors.push('Number is required!');
    }
}
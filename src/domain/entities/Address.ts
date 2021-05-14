import { EntityBase, ParamsTypes } from './base/EntityBase';
import { EntityResult } from './result/EntityResult';

export class Address extends EntityBase<Address> {
    private userId!: string;
    get _userId(): string { return this.userId }

    private country!: string;
    get _country(): string { return this.country }

    private state!: string;
    get _state(): string { return this.state }

    private city!: string;
    get _city(): string { return this.city }

    private neighborhood!: string;
    get _neighborhood(): string { return this.neighborhood }

    private street!: string;
    get _street(): string { return this.street }

    private number!: string;
    get _number(): string { return this.number }

    private constructor(props: any) {
        super(props.id ? props.id : null);

        Object.assign(this, props);
    }

    static createAddress(props: any): EntityResult<Address> {
        const validateResult = this.validateParameters([
            {
                keyName: 'userId',
                type: ParamsTypes.string,
                value: props?.userId
            },
            {
                keyName: 'country',
                type: ParamsTypes.string,
                value: props?.country
            },
            {
                keyName: 'state',
                type: ParamsTypes.string,
                value: props?.state
            },
            {
                keyName: 'city',
                type: ParamsTypes.string,
                value: props?.city
            },
            {
                keyName: 'neighborhood',
                type: ParamsTypes.string,
                value: props?.neighborhood
            },
            {
                keyName: 'street',
                type: ParamsTypes.string,
                value: props?.street
            },
            {
                keyName: 'number',
                type: ParamsTypes.string,
                value: props?.number
            },
        ]);

        if (!validateResult.isSuccess)
            return EntityResult.fail<Address>(validateResult.notifications);

        return EntityResult.ok<Address>(new Address(props));
    }
}
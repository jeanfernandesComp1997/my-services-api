const { v4: idGen } = require('uuid')

export abstract class EntityBase<T> {
    protected readonly id: string;

    constructor(id?) {
        if (id)
            this.id = id;
        else
            this.id = idGen();
    }

    protected static validateParameters(params: Array<ParamsValidate>): ResultValidate {
        let notifications: Array<string> = [];

        params.forEach(param => {
            switch (param.type) {
                case ParamsTypes.string:
                    if (param.value === '' || param.value === null || param.value === undefined)
                        notifications.push(`Ops, param ${param.keyName} is required`);
                    break;

                default:
                    break;
            }
        });

        let result: ResultValidate = {
            isSuccess: notifications.length > 0 ? false : true,
            notifications: notifications.toString()
        };

        return result;
    }
}

interface ParamsValidate {
    keyName: string;
    value: string;
    type: ParamsTypes;
}

interface ResultValidate {
    isSuccess: boolean;
    notifications: string;
}

export enum ParamsTypes {
    string,
    number,
    boolean,
    date
}
const { v4: idGen } = require('uuid')

export class EntityBase {
    _errors: string[];
    id: string;

    constructor(id?) {
        if (id)
            this.id = id;
        else
            this.id = idGen();

        this._errors = [];
    }
}
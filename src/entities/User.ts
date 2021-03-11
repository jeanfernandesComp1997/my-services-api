export class User {
    id: number;
    name: string;
    age: number;

    constructor(props) {
        Object.assign(this, props);
    }

    validate() {
        if (this.name === '' || this.name === null || this.name === undefined)
            throw new Error('Name is required!');

        if (isNaN(this.age) || this.age === null || this.age === undefined || !this.age)
            throw new Error('Age is required!');
    }
}
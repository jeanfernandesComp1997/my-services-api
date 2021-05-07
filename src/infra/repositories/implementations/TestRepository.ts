import { ITestRepository } from './../ITestRepository';

export class TestRepository implements ITestRepository {
    private id: string;

    constructor(id: string) {
        this.id = id;
    }

    getId() {
        return this.id;
    }
}
export class RepositoryExceptions extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'RepositoryExceptions';
    }
}

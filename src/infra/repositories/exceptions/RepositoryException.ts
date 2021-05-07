export class RepositoryExceptions extends Error {
    constructor(message) {
        super(message);
        this.name = 'RepositoryExceptions';
    }
}

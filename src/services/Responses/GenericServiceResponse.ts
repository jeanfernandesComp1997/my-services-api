export class GenericServiceResponse {
    success: boolean;
    message: string;
    data: object;

    constructor(sucess: boolean, message: string, data: object) {
        this.success = sucess;
        this.message = message;
        this.data = data;
    }
}
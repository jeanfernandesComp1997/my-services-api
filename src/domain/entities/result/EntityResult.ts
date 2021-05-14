export class EntityResult<T>{
    public isSuccess: boolean;
    public error: string;
    private _value: T;

    private constructor(isSuccess: boolean, error?: string, value?: T | any) {
        if (isSuccess && error) {
            throw new Error(`InvalidOperation: A result cannot be 
            successful and contain an error`);
        }
        if (!isSuccess && !error) {
            throw new Error(`InvalidOperation: A failing result 
            needs to contain an error message`);
        }

        this.isSuccess = isSuccess;
        this.error = error ? error : "";
        this._value = value;

        Object.freeze(this);
    }

    public getValue(): T {
        if (!this.isSuccess) {
            throw new Error(`Cant retrieve the value from a failed result.`)
        }

        return this._value;
    }

    public static ok<U>(value?: U): EntityResult<U> {
        return new EntityResult<U>(true, "", value);
    }

    public static fail<U>(error: string): EntityResult<U> {
        return new EntityResult<U>(false, error);
    }
}
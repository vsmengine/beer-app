export class ResponseHandler<T> {

    constructor(
        private data: {result: T[], errors: any}
    ) {

    }

    public isSuccess(): boolean {
        return this.data?.errors === undefined;
    }

    public getResult(): T[] {
        return this.data?.result;
    }

    public getErrors(): any {
        return this.data?.errors;
    }

}
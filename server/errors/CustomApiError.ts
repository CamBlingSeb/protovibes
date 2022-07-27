import { HttpStatusCode } from "common/types";

export abstract class CustomApiError extends Error {
    abstract statusCode: HttpStatusCode;

    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, CustomApiError.prototype);
    }
}
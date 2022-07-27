import { CustomApiError } from './CustomApiError';
import { HttpStatusCode } from 'common/types';

export class NotAuthorizedError extends CustomApiError {
    statusCode = HttpStatusCode.NOT_AUTHORIZED;

    constructor(message?: string) {
        super(message || 'Not Authorized');

        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }
}
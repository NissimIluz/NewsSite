import { ErrorCodes } from "./../enums/error-codes";

export interface ErrorObj {
    errorMessage: number;
    errorCode: ErrorCodes;
    error: Error;
}
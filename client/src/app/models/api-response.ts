import { ErrorObj } from "./error";

export interface ApiResponse {
    status: boolean;
    data: any;
    error: ErrorObj;
}
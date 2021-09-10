import { Stop } from "./stop";


export interface StopData {
    data: Stop[],
    meta: {
        totalItems: number,
        itemCount: number,
        itemsPerPage: number,
        totalPages: number,
        currentPage: number
    }
}
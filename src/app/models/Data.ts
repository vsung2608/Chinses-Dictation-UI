export interface DataPaged<T>{
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalElements: number;
    data: T[];
}
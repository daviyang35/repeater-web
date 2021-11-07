/// <reference types='axios' />
/// <reference types='@types/classnames' />

declare global {
    interface Window {
        ActiveXObject: any;
    }
}

declare type Pagination = {
    page: number,
    size: number
}

declare type PaginatedResponse<T> = {
    count?: number;
    totalPage?: number;
    pageSize?: number;
    pageIndex?: number;
    data?: T
}




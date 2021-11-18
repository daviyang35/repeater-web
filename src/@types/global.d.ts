/// <reference types='axios' />
/// <reference types='@types/classnames' />

declare global {

    interface Window {
        ActiveXObject: any;
        jsonlint: any;
    }
}

declare type Pagination = {
    page: number,
    size: number
}

declare type RepeaterResult<T> = {
    success: boolean;
    message?: string;
    data?: T;
}

declare type PageResult<T> = {
    success: boolean,
    message?: string,
    count?: number,
    totalPage?: number,
    pageSize?: number,
    pageIndex?: number,
    data?: T[],
}

declare type PaginatedResponse<T> = {
    count?: number;
    totalPage?: number;
    pageSize?: number;
    pageIndex?: number;
    data?: T
}

declare let renderWithRouter = (ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>, {route = "/"} = {}) => {
};

declare let spyOnRender = () => {
};




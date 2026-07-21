export interface Employee {
    id?: number;
    name: string;
    email: string;
    department: string;
    salary: number;
    photo?: string;
    photoUrl?: string;
}

// ==========================================
// Generic API Response
// ==========================================

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    timestamp: string;
}

// ==========================================
// Spring Boot Page Response
// ==========================================

export interface PageResponse<T> {

    content: T[];

    totalPages: number;

    totalElements: number;

    number: number;

    size: number;

    first: boolean;

    last: boolean;

}
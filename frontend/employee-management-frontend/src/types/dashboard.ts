export interface Dashboard {

    totalEmployees: number;

    totalDepartments: number;

    totalAdmins: number;

    totalUsers: number;

}

export interface ApiResponse<T> {

    success: boolean;

    message: string;

    data: T;

    timestamp: string;

}
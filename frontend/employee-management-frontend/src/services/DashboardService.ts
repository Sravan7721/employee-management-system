import api from "../api/axios";

export interface DashboardChart {
    name: string;
    value: number;
}

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    timestamp: string;
}

class DashboardService {

    getDepartmentChart() {
        return api.get<ApiResponse<DashboardChart[]>>(
            "/dashboard/chart"
        );
    }

}

export default new DashboardService();
import api from "../api/axios";

export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    password: string;
    role: string;
}

export interface LoginResponse {

    token: string;

    role: string;

}

export interface ApiResponse<T> {

    success: boolean;

    message: string;

    data: T;

    timestamp: string;

}

class AuthService {

    // ==========================
    // Login
    // ==========================

    async login(
        data: LoginRequest
    ): Promise<{
        data: ApiResponse<LoginResponse>;
    }> {

        const response =
            await api.post<ApiResponse<LoginResponse>>(
                "/auth/login",
                data
            );

        localStorage.setItem(
            "token",
            response.data.data.token
        );

        localStorage.setItem(
            "role",
            response.data.data.role
        );
        localStorage.setItem("username", data.username);

        return response;

    }

    // ==========================
    // Register
    // ==========================

    async register(
        data: RegisterRequest
    ) {

        return await api.post<ApiResponse<string>>(
            "/auth/register",
            data
        );

    }

    // ==========================
    // Logout
    // ==========================

    logout(): void {

        this.clearAuth();

    }

    // ==========================
    // Clear Authentication
    // ==========================

    clearAuth(): void {

        localStorage.removeItem("token");

        localStorage.removeItem("role");

    }

    // ==========================
    // Authentication
    // ==========================

    isAuthenticated(): boolean {

        return !!localStorage.getItem("token");

    }

    // ==========================
    // Get Token
    // ==========================

    getToken(): string | null {

        return localStorage.getItem("token");

    }

    // ==========================
    // Get Role
    // ==========================

    getRole(): string | null {

        return localStorage.getItem("role");

    }

    // ==========================
    // Is Admin
    // ==========================

    isAdmin(): boolean {

        return this.getRole() === "ADMIN";

    }

    // ==========================
    // Is User
    // ==========================

    isUser(): boolean {

        return this.getRole() === "USER";

    }

}

export default new AuthService();
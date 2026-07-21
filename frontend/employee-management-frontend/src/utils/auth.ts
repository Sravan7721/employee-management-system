export const getRole = (): string => {
    return localStorage.getItem("role") || "";
};

export const isAdmin = (): boolean => {
    return getRole() === "ADMIN";
};

export const isUser = (): boolean => {
    return getRole() === "USER";
};
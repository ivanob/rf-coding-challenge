export type User = {
    login: string;
    password: string;
    role: string;
}

export const enum ROLES {
    user = "user",
    admin = "admin"
}
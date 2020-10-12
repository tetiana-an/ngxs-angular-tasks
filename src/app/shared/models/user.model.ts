export interface User {
    name: string;
    email: string;
    password: string;
    role: "user";
} 

export interface UsersList {
    users: User[];
}
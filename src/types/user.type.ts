export interface UserType {
    _id: string;
    title: string;
    email: string;
    password: string;
    status: string;
    role: string;
    deleted: boolean;
    accessToken: string;
    refreshToken: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;

}

export interface UserResponse {
    data: UserType[];
    currentPage: number;
    totalItems: number;
}
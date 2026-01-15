export interface User {
    id: string;
    email: string;
    username: string;
    elo_rating: number;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface UserCreate {
    email: string;
    username: string;
    password: string;
    referral_code?: string;
}

export interface UserRegisterResponse {
    user: User;
    tokens: {
        access_token: string;
        refresh_token: string;
        token_type: string;
    };
}

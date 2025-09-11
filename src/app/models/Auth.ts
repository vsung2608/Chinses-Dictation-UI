export interface LoginRequest{
  username?: string;
  password?: string
}

export interface RefreshTokenRequest{
  token: string;
}

export interface TokenResponse{
  token: string;
  expiresIn: number;
  info: UserBasicInfo;
}

export interface RegisterRequest{
  username: string;
  password: string;
  fullName: string;
}

export interface UserBasicInfo{
  fullName: string;
  avatarUrl:string;
  roles: string[];
}
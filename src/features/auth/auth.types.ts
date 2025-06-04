export interface LoginInputDTO {
  username: string;
  password: string;
}

export interface LoginOutputDTO {
  userId: string;
  username: string;
  accessToken: string;
  refreshToken: string;
}
export type LoginPayload = {
  accessToken: string;
  refreshToken: string;
};

export type LoginUserRequest = {
  login: string;
  password: string;
};

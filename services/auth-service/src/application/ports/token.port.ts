export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface TokenPort {
  generate(userId: string, email: string): TokenPair;
}

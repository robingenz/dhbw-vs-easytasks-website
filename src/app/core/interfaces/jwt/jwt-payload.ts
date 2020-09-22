export interface IJwtPayload {
    iss: string;
    sub: string;
    exp: number;
    nbf: number;
    iat: number;
}

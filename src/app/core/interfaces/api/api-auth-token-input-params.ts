export interface IApiAuthTokenInputParams {
    grant_type: 'password' | 'refresh_token';
    username?: string;
    password?: string;
    refresh_token?: string;
}

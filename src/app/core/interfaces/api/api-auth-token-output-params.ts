export interface IApiAuthTokenOutputParams {
    token_type: 'bearer' | 'refresh_token';
    access_token: string;
    expires_in: number;
    refresh_token?: string;
}

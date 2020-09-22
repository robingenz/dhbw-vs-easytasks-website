import { Injectable } from '@angular/core';
import { ApiService, StorageService, TokenService } from '@app/core/services';
import { IApiAuthRevokeInputParams, IApiAuthTokenInputParams, IApiAuthRegisterInputParams } from '@app/core/interfaces';
import { Jwt } from '@app/core/classes';

@Injectable()
export class AuthService {
    constructor(private apiService: ApiService, private storageService: StorageService, private tokenService: TokenService) {}

    public async login(username: string, password: string): Promise<void> {
        const inputParams: IApiAuthTokenInputParams = {
            grant_type: 'password',
            username: username,
            password: password,
        };
        const outputParams = await this.apiService.token(inputParams);
        this.tokenService.setAccessToken(new Jwt(outputParams.access_token));
        this.tokenService.setRefreshToken(outputParams.refresh_token || '');
    }

    public async logout(revokeRefreshToken: boolean = true): Promise<void> {
        if (revokeRefreshToken) {
            const refreshToken = this.tokenService.getRefreshToken();
            if (!refreshToken) {
                throw new Error('An error has occurred. The refresh token is missing.');
            }
            const inputParams: IApiAuthRevokeInputParams = {
                refresh_token: refreshToken,
            };
            await this.apiService.revoke(inputParams);
        }
        this.clearSession();
    }

    public async register(username: string, password: string): Promise<void> {
        const inputParams: IApiAuthRegisterInputParams = {
            username: username,
            password: password,
        };
        await this.apiService.register(inputParams);
    }

    public async isAuthenticated(): Promise<boolean> {
        const jwt = this.tokenService.getAccessToken();
        if (jwt) {
            return true;
        }
        return false;
    }

    private clearSession(): void {
        this.storageService.clearStorage();
    }
}

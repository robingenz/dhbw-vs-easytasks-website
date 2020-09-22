import { Injectable } from '@angular/core';
import { IApiAuthTokenInputParams } from '@app/core/interfaces';
import { Jwt } from '@app/core/classes';
import { StorageKey } from '@app/core/enums';
import { StorageService } from '../storage/storage.service';
import { ApiService } from '../api/api.service';

@Injectable()
export class TokenService {
    constructor(private storageService: StorageService, private apiService: ApiService) {}

    public setAccessToken(jwt: Jwt): void {
        this.storageService.storeData<string>(StorageKey.AccessToken, jwt.getEncodedToken());
    }

    public getAccessToken(): Jwt | null {
        const encodedToken = this.storageService.retrieveData<string>(StorageKey.AccessToken);
        if (!encodedToken) {
            return null;
        }
        return new Jwt(encodedToken);
    }

    public setRefreshToken(refreshToken: string): void {
        this.storageService.storeData<string>(StorageKey.RefreshToken, refreshToken);
    }

    public getRefreshToken(): string | null {
        const refreshToken = this.storageService.retrieveData<string>(StorageKey.RefreshToken);
        if (!refreshToken) {
            return null;
        }
        return refreshToken;
    }

    public async refreshAccessToken(): Promise<Jwt> {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) {
            throw new Error('An error has occurred. The refresh token is missing.');
        }
        const inputParams: IApiAuthTokenInputParams = {
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        };
        const outputParams = await this.apiService.token(inputParams);
        this.setAccessToken(new Jwt(outputParams.access_token));
        const jwt = this.getAccessToken();
        if (!jwt) {
            throw new Error('An error occurred while refreshing the access token.');
        }
        return jwt;
    }
}

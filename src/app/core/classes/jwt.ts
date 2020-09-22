import { IJwtHeader, IJwtPayload } from '@app/core/interfaces';

export class Jwt {
    private encodedToken: string;
    private encodedHeader: string;
    private encodedPayload: string;
    private encodedSignature: string;

    constructor(encodedToken: string) {
        const jwtParts = encodedToken.split('.');
        if (jwtParts.length !== 3) {
            throw new Error('Invalid JSON Web Token.');
        }
        this.encodedToken = encodedToken;
        this.encodedHeader = jwtParts[0];
        this.encodedPayload = jwtParts[1];
        this.encodedSignature = jwtParts[2];
    }

    public getEncodedToken(): string {
        return this.encodedToken;
    }

    public getEncodedHeader(): string {
        return this.encodedHeader;
    }

    public getDecodedHeader(): IJwtHeader {
        return this.decode(this.encodedHeader);
    }

    public getEncodedPayload(): string {
        return this.encodedPayload;
    }

    public getDecodedPayload(): IJwtPayload {
        return this.decode(this.encodedPayload);
    }

    public getEncodedSignatures(): string {
        return this.encodedSignature;
    }

    private decode(base64Url: string): any {
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(atob(base64));
    }

    public isExpired(): boolean {
        const decodedPayload = this.getDecodedPayload();
        const currentTimestamp = Math.round(Date.now() / 1000);
        if (decodedPayload.exp < currentTimestamp) {
            return true;
        }
        return false;
    }
}

import { Injectable } from '@angular/core';
import { StorageKey } from '@app/core/enums';

@Injectable()
export class StorageService {
    constructor() {}

    public storeData<T>(key: StorageKey, value: T): void {
        const item = JSON.stringify(value);
        localStorage.setItem(key, item);
    }

    public retrieveData<T>(key: StorageKey): T | null {
        const item = localStorage.getItem(key);
        if (!item) {
            return null;
        }
        return JSON.parse(item);
    }

    public removeData(key: StorageKey): void {
        localStorage.removeItem(key);
    }

    public clearStorage(): void {
        localStorage.clear();
    }
}

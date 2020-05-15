import { Injectable } from '@angular/core';

interface StorageItem {
    expires: number;
    data: any;
};

const ONE_YEAR = 60 * 60 * 24 * 365 * 1000;

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
    constructor() { }

    public get(key: string): any {
        const jsonString = localStorage.getItem(key);
        try {
            const parsed = JSON.parse(jsonString);
            return (parsed && parsed.expires && parsed.expires > Date.now()) ?
                parsed.data : null;
        }
        catch (e) {
            console.error('unable to parse value from local storage');
            return null;
        }
    }

    public set(key: string, val: any, ttl: number = ONE_YEAR): void {
        return localStorage.setItem(key, JSON.stringify({
            expires: Date.now() + ttl,
            data: val
        }));
    }

    public clear(): void {
        return localStorage.clear();
    }
}
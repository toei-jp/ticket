/**
 * SelectService
 */
import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';

export interface ISelect {
    purchase: IPurchaseSelect;
}

export interface IPurchaseSelect {
    theater: string;
    date: string;
}

@Injectable()
export class SelectService {
    public data: ISelect;

    constructor(private storage: StorageService) { }

    public getSelect(): ISelect {
        if (this.data === undefined) {
            this.data = this.storage.load('select');
        }
        if (this.data === undefined || this.data === null) {
            this.data = {
                purchase: {
                    theater: '',
                    date: ''
                }
            };
        }

        return this.data;
    }

    public save(): void {
        if (this.data === undefined) {
            this.getSelect();
        }

        this.storage.save('select', this.data);
    }

}

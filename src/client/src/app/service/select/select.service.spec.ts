/**
 * SelectService
 */
import { inject, TestBed } from '@angular/core/testing';
import { SelectService } from './select.service';

describe('SelectService', () => {
    it('getSelect dateなし ストレージあり', async () => {
        const storageServiceStub: any = {
            date: undefined,
            load: () => {
                return {
                    purchase: { date: '', theater: '' }
                };
            }
        };
        const service = new SelectService(storageServiceStub);
        const select = service.getSelect();
        expect(select.purchase);
        expect(select.purchase.date);
        expect(select.purchase.theater);
    });

    it('getSelect dateなし ストレージなし', async () => {
        const storageServiceStub: any = {
            date: undefined,
            load: () => {
                return null;
            }
        };
        const service = new SelectService(storageServiceStub);
        const select = service.getSelect();
        expect(select.purchase);
        expect(select.purchase.date);
        expect(select.purchase.theater);
    });

    it('save dateなし ストレージあり', async () => {
        const storageServiceStub: any = {
            date: undefined,
            load: () => {
                return {
                    purchase: { date: '', theater: '' }
                };
            },
            save: () => { }
        };
        const service = new SelectService(storageServiceStub);
        try {
            service.save();
        } catch (err) {
            expect(err).toBeUndefined();
        }
    });
});

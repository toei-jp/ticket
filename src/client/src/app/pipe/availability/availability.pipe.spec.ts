/**
 * AvailabilityPipeテスト
 */
import { AvailabilityPipe } from './availability.pipe';

describe('AvailabilityPipe', () => {
    it('transform 空席あり', () => {
        const pipe = new AvailabilityPipe();
        expect(pipe).toBeTruthy();
        const result = pipe.transform(100);
        expect(result.symbolText).toEqual('○');
    });

    it('transform 空席残りわずか', () => {
        const pipe = new AvailabilityPipe();
        expect(pipe).toBeTruthy();
        const result = pipe.transform(5);
        expect(result.symbolText).toEqual('△');
    });

    it('transform 空席なし', () => {
        const pipe = new AvailabilityPipe();
        expect(pipe).toBeTruthy();
        const result = pipe.transform(0);
        expect(result.symbolText).toEqual('×');
    });
});

import { describe, expect, test } from 'vitest';

export const range = (n: number): number[] =>
    Array.from({ length: n }, (_, i) => i + 1);

describe('range 함수 테스트', () => {
    test('기본 동작 테스트', () => {
        expect(range(5)).toEqual([1, 2, 3, 4, 5]);
    });

    test('0일 때 빈 배열 반환', () => {
        expect(range(0)).toEqual([]);
    });

    test('큰 수 테스트', () => {
        expect(range(10)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });
});
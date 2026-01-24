import { describe, test, expect } from "vitest";

/**
 * 문제: 최빈값 구하기
 * 레벨: 0
 * 링크: https://school.programmers.co.kr/learn/courses/30/lessons/120812
 *
 * 문제 설명:
 * 최빈값은 주어진 값 중에서 가장 자주 나오는 값을 의미합니다.
 * 정수 배열 array가 매개변수로 주어질 때, 최빈값을 return 하도록 solution 함수를 완성해보세요.
 * 최빈값이 여러 개면 -1을 return 합니다.
 *
 * 제한사항:
 * - 0 < array의 길이 < 100
 * - 0 ≤ array의 원소 < 1000
 *
 * 순수함수
 */

const countByElements = (arr: number[]): { value: number; count: number }[] => {
  const uniqueNumbers = Array.from(new Set(arr));
  const counts = uniqueNumbers.map((num) => ({ value: num, count: 0 }));

  // 각 숫자의 등장 횟수 세기
  counts.forEach((item) => {
    arr.forEach((num) => {
      if (num === item.value) item.count += 1;
    });
  });

  return counts;
};

// 최댓값 count 구하는 함수
const getMax = (items: { value: number; count: number }[]): number => {
  let max = 0;
  items.forEach((item) => {
    // reduce
    if (item.count > max) max = item.count;
  });
  return max;
};

// 최댓값 count가 여러 개 있는지 확인
const checkDuplicates = (
  max: number,
  items: { value: number; count: number }[],
): boolean => {
  let duplicateCount = 0;
  items.forEach((item) => {
    // reduce
    if (item.count === max) duplicateCount++;
  });
  return duplicateCount >= 2;
};

// 최빈값 구하는 메인 함수
function solution(arr: number[]): number {
  const counts = countByElements(arr);
  const maxCount = getMax(counts);

  if (checkDuplicates(maxCount, counts)) return -1;

  const mostFrequent = counts.find((item) => item.count === maxCount);
  return mostFrequent?.value ?? 0; //
}

// ============================================
// 테스트 케이스
// ============================================

describe("최빈값 구하기", () => {
  test("[1,2,,3,3,3,4]가 입력일 시", () => {
    expect(solution([1, 2, 3, 3, 3, 4])).toBe(3);
  });

  test("[1,1,2,2]가 입력일 시", () => {
    expect(solution([1, 1, 2, 2])).toBe(-1);
  });

  test("[1]이 입력일 시", () => {
    expect(solution([1])).toBe(1);
  });
});

import { describe, test, expect } from 'vitest';

/**
 * 문제: 모든 레코드 조회하기
 * 레벨: 1
 * 링크: https://school.programmers.co.kr/learn/courses/30/lessons/59034
 * 
 * 문제 설명:
 * 동물 보호소에 들어온 모든 동물의 정보를 ANIMAL_ID순으로 조회하는 SQL문을 작성해주세요.
 * 
 * 제한사항:
 */

SELECT*
FROM ANIMAL_INS
ORDER BY ANIMAL_ID;




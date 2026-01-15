import { describe, test, expect } from 'vitest';

/**
 * 문제: 역순 정렬하기
 * 레벨: 1
 * 링크: https://school.programmers.co.kr/learn/courses/30/lessons/59035
 * 문제 설명:
 * 동물 보호소에 들어온 모든 동물의 이름과 보호 시작일을 조회하는 SQL문을 작성해주세요.
 * 이때 결과는 ANIMAL_ID 역순으로 보여주세요.


 * 
 * 제한사항:
 */

SELECT NAME, DATETIME
FROM ANIMAL_INS
ORDER BY ANIMAL_ID DESC;

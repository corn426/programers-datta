import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { SqlTestHelper, createSqlTest } from '../../utils/sqlTestHelper';
import { resolve } from 'path';

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

const SQL_FILE = resolve(__dirname, 'sql/4_모든_레코드_조회하기.sql');

describe('모든 레코드 조회하기', () => {
  let sqlTest: ReturnType<typeof createSqlTest>;
  let helper: SqlTestHelper;

  beforeEach(() => {
    sqlTest = createSqlTest();
    helper = sqlTest.setup();
  });

  afterEach(() => {
    sqlTest.cleanup();
  });

  test('모든 동물 정보를 ANIMAL_ID 순으로 조회해야 한다', () => {
    // When: SQL 파일 실행
    const result = helper.executeSqlFile(SQL_FILE);
    
    // Then: 결과 검증
    expect(result.length).toBe(8); // 샘플 데이터 8개
    expect(result[0].ANIMAL_ID).toBe('A368742'); // 가장 작은 ID
    expect(result[result.length - 1].ANIMAL_ID).toBe('A414513'); // 가장 큰 ID
  });

  test('모든 컬럼이 포함되어야 한다', () => {
    const result = helper.executeSqlFile(SQL_FILE);
    const expected = helper.expectQuery(helper.readSqlFile(SQL_FILE));
    
    expect(expected.toContainColumns([
      'ANIMAL_ID', 
      'ANIMAL_TYPE', 
      'DATETIME', 
      'INTAKE_CONDITION', 
      'NAME', 
      'SEX_UPON_INTAKE'
    ])).toBe(true);
  });

  test('ANIMAL_ID 오름차순 정렬이 올바르게 되어야 한다', () => {
    const result = helper.executeSqlFile(SQL_FILE);
    const expected = helper.expectQuery(helper.readSqlFile(SQL_FILE));
    
    expect(expected.toBeOrderedBy('ANIMAL_ID', 'ASC')).toBe(true);
  });
});




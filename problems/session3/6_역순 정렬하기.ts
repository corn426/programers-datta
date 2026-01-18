import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { SqlTestHelper, createSqlTest } from '../../utils/sqlTestHelper';
import { resolve } from 'path';

/**
 * 문제: 역순 정렬하기
 * 레벨: 1
 * 링크: https://school.programmers.co.kr/learn/courses/30/lessons/59035
 * 
 * 문제 설명:
 * 동물 보호소에 들어온 모든 동물의 이름과 보호 시작일을 조회하는 SQL문을 작성해주세요.
 * 이때 결과는 ANIMAL_ID 역순으로 보여주세요.
 * 
 * 제한사항:
 */

const SQL_FILE = resolve(__dirname, 'sql/6_역순_정렬하기.sql');

describe('역순 정렬하기', () => {
  let sqlTest: ReturnType<typeof createSqlTest>;
  let helper: SqlTestHelper;

  beforeEach(() => {
    sqlTest = createSqlTest();
    helper = sqlTest.setup();
  });

  afterEach(() => {
    sqlTest.cleanup();
  });

  test('모든 동물의 NAME과 DATETIME을 조회해야 한다', () => {
    const result = helper.executeSqlFile(SQL_FILE);
    
    expect(result.length).toBe(8); // 샘플 데이터 8개
  });

  test('NAME과 DATETIME 컬럼만 포함되어야 한다', () => {
    const result = helper.executeSqlFile(SQL_FILE);
    const expected = helper.expectQuery(helper.readSqlFile(SQL_FILE));
    
    expect(expected.toContainColumns(['NAME', 'DATETIME'])).toBe(true);
    
    // 정확히 2개의 컬럼만 있어야 함
    const firstRecord = result[0];
    expect(Object.keys(firstRecord).length).toBe(2);
  });

  test('ANIMAL_ID 내림차순으로 정렬되어야 한다', () => {
    const result = helper.executeSqlFile(SQL_FILE);
    
    // 실제 데이터로 확인
    expect(result[0].NAME).toBe('Rocky'); // A414513
    expect(result[result.length - 1].NAME).toBe(null); // A368742
  });
});

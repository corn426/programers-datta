import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { SqlTestHelper, createSqlTest } from '../../utils/sqlTestHelper';
import { resolve } from 'path';

/**
 * 문제: 아픈 동물 찾기
 * 레벨: 1
 * 링크: https://school.programmers.co.kr/learn/courses/30/lessons/59036
 * 
 * 문제 설명:
 * 동물 보호소에 들어온 동물 중 아픈 동물의 아이디와 이름을 조회하는 SQL 문을 작성해주세요.
 * 이때 결과는 아이디 순으로 조회해주세요.
 * 
 * 제한사항:
 */

const SQL_FILE = resolve(__dirname, 'sql/5_아픈_동물_찾기.sql');

describe('아픈 동물 찾기', () => {
  let sqlTest: ReturnType<typeof createSqlTest>;
  let helper: SqlTestHelper;

  beforeEach(() => {
    sqlTest = createSqlTest();
    helper = sqlTest.setup();
  });

  afterEach(() => {
    sqlTest.cleanup();
  });

  test('아픈 동물만 조회해야 한다', () => {
    const result = helper.executeSqlFile(SQL_FILE);
    
    // 샘플 데이터에서 Sick인 동물은 2마리
    expect(result.length).toBe(2);
    
    // 실제로 아픈 동물의 ID가 맞는지 확인 (전체 데이터와 비교)
    const allAnimals = helper.getAllAnimals();
    const sickAnimals = allAnimals.filter(a => a.INTAKE_CONDITION === 'Sick');
    
    const resultIds = result.map((r: any) => r.ANIMAL_ID).sort();
    const expectedIds = sickAnimals.map(a => a.ANIMAL_ID).sort();
    
    expect(resultIds).toEqual(expectedIds);
  });

  test('ANIMAL_ID와 NAME 컬럼만 포함되어야 한다', () => {
    const result = helper.executeSqlFile(SQL_FILE);
    const expected = helper.expectQuery(helper.readSqlFile(SQL_FILE));
    
    expect(expected.toContainColumns(['ANIMAL_ID', 'NAME'])).toBe(true);
    
    // 다른 컬럼은 없어야 함
    const firstRecord = result[0];
    expect(Object.keys(firstRecord).length).toBe(2);
  });

  test('ANIMAL_ID 오름차순으로 정렬되어야 한다', () => {
    const result = helper.executeSqlFile(SQL_FILE);
    const expected = helper.expectQuery(helper.readSqlFile(SQL_FILE));
    
    expect(expected.toBeOrderedBy('ANIMAL_ID', 'ASC')).toBe(true);
  });
});


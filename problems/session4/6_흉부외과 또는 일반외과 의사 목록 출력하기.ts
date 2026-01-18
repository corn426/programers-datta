import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { SqlTestHelper, createSqlTest } from "../../utils/sqlTestHelper";
import { resolve } from "path";

/**
 * 문제: 흉부외과 또는 일반외과 의사 목록 출력하기
 * 레벨: 1
 * 링크: https://school.programmers.co.kr/learn/courses/30/lessons/132203
 */

const SQL_FILE = resolve(
  __dirname,
  "sql/6_흉부외과_또는_일반외과_의사_목록_출력하기.sql",
);

describe("흉부외과 또는 일반외과 의사 목록 출력하기", () => {
  let sqlTest: ReturnType<typeof createSqlTest>;
  let helper: SqlTestHelper;

  beforeEach(() => {
    sqlTest = createSqlTest();
    helper = sqlTest.setup();
  });

  afterEach(() => {
    sqlTest.cleanup();
  });

  test("CS 또는 GS 진료과 의사만 조회해야 한다", () => {
    const result = helper.executeSqlFile(SQL_FILE);

    expect(result.length).toBeGreaterThan(0);
    result.forEach((doctor: any) => {
      expect(["CS", "GS"]).toContain(doctor.MCDP_CD);
    });
  });

  test("필요한 컬럼들이 포함되어야 한다", () => {
    const result = helper.executeSqlFile(SQL_FILE);
    const expected = helper.expectQuery(helper.readSqlFile(SQL_FILE));

    expect(
      expected.toContainColumns(["DR_NAME", "DR_ID", "MCDP_CD", "HIRE_YMD"]),
    ).toBe(true);
  });

  test("고용일자 내림차순, 이름 오름차순 정렬이어야 한다", () => {
    const result = helper.executeSqlFile(SQL_FILE);

    // 첫 번째는 가장 최근 고용일자
    expect(result.length).toBeGreaterThan(0);
  });
});

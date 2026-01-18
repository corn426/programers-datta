import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { SqlTestHelper, createSqlTest } from "../../utils/sqlTestHelper";
import { resolve } from "path";

/**
 * 문제: 자동차 대여 기록에서 장기/단기 대여 구분하기
 * 레벨: 1
 * 링크: https://school.programmers.co.kr/learn/courses/30/lessons/151138
 */

const SQL_FILE = resolve(
  __dirname,
  "sql/8_자동차_대여_기록에서_장기_단기_대여_구분하기.sql",
);

describe("자동차 대여 기록에서 장기/단기 대여 구분하기", () => {
  let sqlTest: ReturnType<typeof createSqlTest>;
  let helper: SqlTestHelper;

  beforeEach(() => {
    sqlTest = createSqlTest();
    helper = sqlTest.setup();
  });

  afterEach(() => {
    sqlTest.cleanup();
  });

  test("RENT_TYPE 컬럼이 있어야 한다", () => {
    const result = helper.executeSqlFile(SQL_FILE);

    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty("RENT_TYPE");
  });

  test("장기 대여 또는 단기 대여 구분이 있어야 한다", () => {
    const result = helper.executeSqlFile(SQL_FILE);

    result.forEach((record: any) => {
      expect(["장기 대여", "단기 대여"]).toContain(record.RENT_TYPE);
    });
  });

  test("모든 컬럼이 포함되어야 한다", () => {
    const result = helper.executeSqlFile(SQL_FILE);
    const expected = helper.expectQuery(helper.readSqlFile(SQL_FILE));

    expect(
      expected.toContainColumns([
        "HISTORY_ID",
        "CAR_ID",
        "START_DATE",
        "END_DATE",
        "RENT_TYPE",
      ]),
    ).toBe(true);
  });

  test("HISTORY_ID 내림차순 정렬이어야 한다", () => {
    const result = helper.executeSqlFile(SQL_FILE);
    const expected = helper.expectQuery(helper.readSqlFile(SQL_FILE));

    expect(expected.toBeOrderedBy("HISTORY_ID", "DESC")).toBe(true);
  });
});

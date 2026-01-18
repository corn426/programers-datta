import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { SqlTestHelper, createSqlTest } from "../../utils/sqlTestHelper";
import { resolve } from "path";

/**
 * 문제: 자동차 대여 기록에서 대여중 / 대여 가능 여부 구하기
 * 레벨: 3
 * 링크: https://school.programmers.co.kr/learn/courses/30/lessons/157340
 */

const SQL_FILE = resolve(
  __dirname,
  "sql/7_자동차_대여_기록에서_대여중_대여_가능_여부_구분하기.sql",
);

describe("자동차 대여 기록에서 대여중 / 대여 가능 여부 구분하기", () => {
  let sqlTest: ReturnType<typeof createSqlTest>;
  let helper: SqlTestHelper;

  beforeEach(() => {
    sqlTest = createSqlTest();
    helper = sqlTest.setup();
  });

  afterEach(() => {
    sqlTest.cleanup();
  });

  test("AVAILABILITY 컬럼이 있어야 한다", () => {
    const result = helper.executeSqlFile(SQL_FILE);

    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty("AVAILABILITY");
  });

  test("대여중 또는 대여 가능 상태를 반환해야 한다", () => {
    const result = helper.executeSqlFile(SQL_FILE);

    result.forEach((record: any) => {
      expect(["대여중", "대여 가능"]).toContain(record.AVAILABILITY);
    });
  });

  test("CAR_ID와 AVAILABILITY 컬럼이 포함되어야 한다", () => {
    const result = helper.executeSqlFile(SQL_FILE);
    const expected = helper.expectQuery(helper.readSqlFile(SQL_FILE));

    expect(expected.toContainColumns(["CAR_ID", "AVAILABILITY"])).toBe(true);
  });
});

import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { SqlTestHelper, createSqlTest } from "../../utils/sqlTestHelper";
import { resolve } from "path";

/**
 * 문제: 조건에 맞는 회원수 구하기
 * 레벨: 1
 * 링크: https://school.programmers.co.kr/learn/courses/30/lessons/131535
 */

const SQL_FILE = resolve(__dirname, "sql/4_조건에_맞는_회원수_구하기.sql");

describe("조건에 맞는 회원수 구하기", () => {
  let sqlTest: ReturnType<typeof createSqlTest>;
  let helper: SqlTestHelper;

  beforeEach(() => {
    sqlTest = createSqlTest();
    helper = sqlTest.setup();
  });

  afterEach(() => {
    sqlTest.cleanup();
  });

  test("2021년에 가입한 20대 회원수를 조회해야 한다", () => {
    const result = helper.executeSqlFile(SQL_FILE);

    expect(result.length).toBe(1);
    expect(result[0].USERS).toBe(3); // 샘플 데이터에서 조건 만족하는 회원 3명
  });

  test("COUNT 함수를 사용해야 한다", () => {
    const sql = helper.readSqlFile(SQL_FILE);
    expect(sql.toUpperCase()).toContain("COUNT");
  });

  test("USERS 컬럼이 있어야 한다", () => {
    const result = helper.executeSqlFile(SQL_FILE);
    expect(result[0]).toHaveProperty("USERS");
  });
});

import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { SqlTestHelper, createSqlTest } from "../../utils/sqlTestHelper";
import { resolve } from "path";

/**
 * 문제: 조건에 맞는 도서 리스트 출력하기
 * 레벨: 1
 * 링크: https://school.programmers.co.kr/learn/courses/30/lessons/144853
 */

const SQL_FILE = resolve(
  __dirname,
  "sql/5_조건에_맞는_도서_리스트_출력하기.sql",
);

describe("조건에 맞는 도서 리스트 출력하기", () => {
  let sqlTest: ReturnType<typeof createSqlTest>;
  let helper: SqlTestHelper;

  beforeEach(() => {
    sqlTest = createSqlTest();
    helper = sqlTest.setup();
  });

  afterEach(() => {
    sqlTest.cleanup();
  });

  test("2021년 인문 카테고리 도서를 조회해야 한다", () => {
    const result = helper.executeSqlFile(SQL_FILE);

    expect(result.length).toBeGreaterThan(0);
    result.forEach((book: any) => {
      expect(book.PUBLISHED_DATE).toContain("2021");
    });
  });

  test("BOOK_ID와 PUBLISHED_DATE 컬럼만 포함되어야 한다", () => {
    const result = helper.executeSqlFile(SQL_FILE);
    const expected = helper.expectQuery(helper.readSqlFile(SQL_FILE));

    expect(expected.toContainColumns(["BOOK_ID", "PUBLISHED_DATE"])).toBe(true);
  });

  test("출판일 기준 오름차순 정렬이어야 한다", () => {
    const result = helper.executeSqlFile(SQL_FILE);
    const expected = helper.expectQuery(helper.readSqlFile(SQL_FILE));

    expect(expected.toBeOrderedBy("PUBLISHED_DATE", "ASC")).toBe(true);
  });
});

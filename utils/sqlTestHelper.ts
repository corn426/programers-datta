import Database from "better-sqlite3";
import { readFileSync } from "fs";
import { resolve } from "path";

export interface AnimalRecord {
  ANIMAL_ID: string;
  ANIMAL_TYPE: string;
  DATETIME: string;
  INTAKE_CONDITION: string;
  NAME: string | null;
  SEX_UPON_INTAKE: string;
}

export class SqlTestHelper {
  private db: Database.Database;

  constructor() {
    // 메모리 DB 생성
    this.db = new Database(":memory:");
    this.registerMySQLFunctions();
    this.setupTables();
    this.insertSampleData();
  }

  /**
   * MySQL 호환 함수 등록 (프로그래머스 환경과 동일하게)
   */
  private registerMySQLFunctions() {
    // YEAR(date) - 날짜에서 연도 추출
    this.db.function("YEAR", (dateStr: string) => {
      if (!dateStr) return null;
      const date = new Date(dateStr);
      return date.getFullYear();
    });

    // DATEDIFF(date1, date2) - 두 날짜 간 일수 차이
    this.db.function("DATEDIFF", (date1: string, date2: string) => {
      if (!date1 || !date2) return null;
      const d1 = new Date(date1);
      const d2 = new Date(date2);
      const diffTime = d1.getTime() - d2.getTime();
      return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    });

    // DATE_FORMAT(date, format) - 날짜 포맷팅 (기본 %Y-%m-%d만 지원)
    this.db.function("DATE_FORMAT", (dateStr: string, format: string) => {
      if (!dateStr) return null;
      const date = new Date(dateStr);

      // 간단한 포맷팅 (%Y-%m-%d)
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    });
  }

  private setupTables() {
    // ANIMAL_INS 테이블 생성 (프로그래머스 SQL 문제에서 자주 사용)
    this.db.exec(`
      CREATE TABLE ANIMAL_INS (
        ANIMAL_ID VARCHAR(255) PRIMARY KEY,
        ANIMAL_TYPE VARCHAR(255) NOT NULL,
        DATETIME DATETIME NOT NULL,
        INTAKE_CONDITION VARCHAR(255) NOT NULL,
        NAME VARCHAR(255),
        SEX_UPON_INTAKE VARCHAR(255) NOT NULL
      )
    `);

    // ANIMAL_OUTS 테이블도 생성 (입양 관련 문제용)
    this.db.exec(`
      CREATE TABLE ANIMAL_OUTS (
        ANIMAL_ID VARCHAR(255) PRIMARY KEY,
        ANIMAL_TYPE VARCHAR(255) NOT NULL,
        DATETIME DATETIME NOT NULL,
        NAME VARCHAR(255),
        SEX_UPON_OUTCOME VARCHAR(255) NOT NULL
      )
    `);

    // USER_INFO 테이블 (회원 관련 문제용)
    this.db.exec(`
      CREATE TABLE USER_INFO (
        USER_ID INTEGER PRIMARY KEY,
        GENDER VARCHAR(1),
        AGE INTEGER,
        JOINED DATE
      )
    `);

    // BOOK 테이블 (도서 관련 문제용)
    this.db.exec(`
      CREATE TABLE BOOK (
        BOOK_ID INTEGER PRIMARY KEY,
        CATEGORY VARCHAR(50),
        AUTHOR_ID INTEGER,
        PRICE INTEGER,
        PUBLISHED_DATE DATE
      )
    `);

    // DOCTOR 테이블 (의사 관련 문제용)
    this.db.exec(`
      CREATE TABLE DOCTOR (
        DR_NAME VARCHAR(100),
        DR_ID VARCHAR(10) PRIMARY KEY,
        LCNS_NO VARCHAR(20),
        HIRE_YMD DATE,
        MCDP_CD VARCHAR(10),
        TLNO VARCHAR(20)
      )
    `);

    // CAR_RENTAL_COMPANY_RENTAL_HISTORY 테이블 (자동차 대여 기록)
    this.db.exec(`
      CREATE TABLE CAR_RENTAL_COMPANY_RENTAL_HISTORY (
        HISTORY_ID INTEGER PRIMARY KEY,
        CAR_ID INTEGER,
        START_DATE DATE,
        END_DATE DATE
      )
    `);
  }

  private insertSampleData() {
    const insertAnimalIns = this.db.prepare(`
      INSERT INTO ANIMAL_INS (ANIMAL_ID, ANIMAL_TYPE, DATETIME, INTAKE_CONDITION, NAME, SEX_UPON_INTAKE)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    // 샘플 데이터 삽입
    const animalData = [
      [
        "A398035",
        "Dog",
        "2014-05-16 14:08:00",
        "Normal",
        "Chewy",
        "Spayed Female",
      ],
      [
        "A381217",
        "Dog",
        "2017-07-08 09:41:00",
        "Sick",
        "Cherokee",
        "Neutered Male",
      ],
      [
        "A400680",
        "Cat",
        "2017-06-17 13:29:00",
        "Normal",
        "Lucy",
        "Spayed Female",
      ],
      [
        "A403564",
        "Dog",
        "2013-11-18 17:03:00",
        "Normal",
        "Anna",
        "Spayed Female",
      ],
      [
        "A394547",
        "Dog",
        "2014-05-20 12:51:00",
        "Normal",
        "Honey",
        "Spayed Female",
      ],
      [
        "A368742",
        "Dog",
        "2013-12-13 06:39:00",
        "Normal",
        null,
        "Neutered Male",
      ],
      [
        "A370507",
        "Cat",
        "2014-10-27 14:43:00",
        "Sick",
        "Emily",
        "Spayed Female",
      ],
      [
        "A414513",
        "Dog",
        "2016-06-07 09:17:00",
        "Normal",
        "Rocky",
        "Neutered Male",
      ],
    ];

    animalData.forEach((data) => {
      insertAnimalIns.run(...data);
    });

    // USER_INFO 샘플 데이터
    const insertUser = this.db.prepare(
      `INSERT INTO USER_INFO (USER_ID, GENDER, AGE, JOINED) VALUES (?, ?, ?, ?)`,
    );
    const userData = [
      [1, "M", 25, "2021-03-15"],
      [2, "F", 29, "2021-06-20"],
      [3, "M", 19, "2021-07-10"],
      [4, "F", 35, "2020-12-05"],
      [5, "M", 21, "2021-09-01"],
    ];
    userData.forEach((data) => insertUser.run(...data));

    // BOOK 샘플 데이터
    const insertBook = this.db.prepare(
      `INSERT INTO BOOK (BOOK_ID, CATEGORY, AUTHOR_ID, PRICE, PUBLISHED_DATE) VALUES (?, ?, ?, ?, ?)`,
    );
    const bookData = [
      [1, "인문", 1, 15000, "2021-01-10"],
      [2, "인문", 2, 18000, "2021-05-20"],
      [3, "소설", 3, 12000, "2020-11-15"],
      [4, "경제", 4, 25000, "2021-08-30"],
      [5, "인문", 5, 20000, "2021-12-01"],
    ];
    bookData.forEach((data) => insertBook.run(...data));

    // DOCTOR 샘플 데이터
    const insertDoctor = this.db.prepare(
      `INSERT INTO DOCTOR (DR_NAME, DR_ID, LCNS_NO, HIRE_YMD, MCDP_CD, TLNO) VALUES (?, ?, ?, ?, ?, ?)`,
    );
    const doctorData = [
      ["김철수", "DR001", "L12345", "2018-03-01", "CS", "010-1234-5678"],
      ["이영희", "DR002", "L23456", "2019-06-15", "GS", "010-2345-6789"],
      ["박민수", "DR003", "L34567", "2020-01-10", "CS", "010-3456-7890"],
      ["최지영", "DR004", "L45678", "2021-09-20", "NP", "010-4567-8901"],
      ["정우성", "DR005", "L56789", "2017-05-01", "GS", "010-5678-9012"],
    ];
    doctorData.forEach((data) => insertDoctor.run(...data));

    // CAR_RENTAL_COMPANY_RENTAL_HISTORY 샘플 데이터
    const insertRental = this.db.prepare(
      `INSERT INTO CAR_RENTAL_COMPANY_RENTAL_HISTORY (HISTORY_ID, CAR_ID, START_DATE, END_DATE) VALUES (?, ?, ?, ?)`,
    );
    const rentalData = [
      [1, 1, "2022-09-01", "2022-09-10"], // 9일 (단기)
      [2, 2, "2022-10-01", "2022-10-31"], // 30일 (장기)
      [3, 3, "2022-10-10", "2022-10-11"], // 1일 (단기)
      [4, 4, "2022-10-16", "2022-10-20"], // 4일 (대여중 - 2022-10-16 기준)
      [5, 5, "2022-09-05", "2022-10-05"], // 30일 (장기)
    ];
    rentalData.forEach((data) => insertRental.run(...data));
  }

  /**
   * SQL 파일 읽기
   */
  readSqlFile(filePath: string): string {
    try {
      const absolutePath = resolve(filePath);
      const content = readFileSync(absolutePath, "utf-8");
      // 주석 제거 및 정리
      return content
        .split("\n")
        .filter((line) => !line.trim().startsWith("--"))
        .join("\n")
        .trim();
    } catch (error) {
      throw new Error(`SQL 파일을 읽을 수 없습니다: ${filePath}\n${error}`);
    }
  }

  /**
   * SQL 파일 실행
   */
  executeSqlFile(filePath: string): any[] {
    const sql = this.readSqlFile(filePath);
    return this.executeQuery(sql);
  }

  /**
   * SQL 쿼리 실행 및 결과 반환
   */
  executeQuery(sql: string): any[] {
    try {
      const stmt = this.db.prepare(sql);
      return stmt.all();
    } catch (error) {
      throw new Error(`SQL 실행 오류: ${error}`);
    }
  }

  /**
   * SQL 쿼리 실행 후 특정 조건 검증
   */
  expectQuery(sql: string) {
    const results = this.executeQuery(sql);

    return {
      results,
      toHaveLength: (expectedLength: number) =>
        results.length === expectedLength,
      toContainColumns: (columns: string[]) => {
        if (results.length === 0) return columns.length === 0;
        const resultColumns = Object.keys(results[0]);
        return columns.every((col) => resultColumns.includes(col));
      },
      toBeOrderedBy: (column: string, order: "ASC" | "DESC" = "ASC") => {
        if (results.length <= 1) return true;
        for (let i = 1; i < results.length; i++) {
          const prev = results[i - 1][column];
          const curr = results[i][column];
          if (order === "ASC" && prev > curr) return false;
          if (order === "DESC" && prev < curr) return false;
        }
        return true;
      },
      toMatchCondition: (condition: (row: any) => boolean) => {
        return results.every(condition);
      },
      toEqual: (expected: any[]) => {
        return JSON.stringify(results) === JSON.stringify(expected);
      },
    };
  }

  /**
   * 테스트 후 정리
   */
  cleanup() {
    this.db.close();
  }

  /**
   * 테이블 데이터 확인용
   */
  getAllAnimals(): AnimalRecord[] {
    return this.db
      .prepare("SELECT * FROM ANIMAL_INS ORDER BY ANIMAL_ID")
      .all() as AnimalRecord[];
  }

  /**
   * 커스텀 테스트 데이터 삽입
   */
  insertTestData(tableName: string, data: Record<string, any>[]) {
    if (data.length === 0) return;

    const columns = Object.keys(data[0]);
    const placeholders = columns.map(() => "?").join(", ");
    const sql = `INSERT INTO ${tableName} (${columns.join(", ")}) VALUES (${placeholders})`;

    const stmt = this.db.prepare(sql);
    data.forEach((row) => {
      const values = columns.map((col) => row[col]);
      stmt.run(...values);
    });
  }
}

/**
 * 테스트에서 쉽게 사용할 수 있는 헬퍼 함수
 */
export function createSqlTest() {
  let helper: SqlTestHelper;

  return {
    setup: () => {
      helper = new SqlTestHelper();
      return helper;
    },
    cleanup: () => {
      helper?.cleanup();
    },
    executeAndExpect: (sql: string) => {
      return helper.expectQuery(sql);
    },
  };
}

# 프로그래머스 과제 풀이

알고리즘 학습을 위한 프로그래머스 문제 풀이 과제 레포지토리입니다.
**TODO Tree**로 주차별 문제를 확인하고, **테스트를 통과시키며** 문제를 완성하는 방식으로 진행합니다.

## 🎯 학습 방식

1. **TODO Tree**에서 이번 주 문제 확인 (`WEEK1` 태그)
2. 문제 파일 열기 (힌트 확인)
3. 코드 작성
4. **테스트 실행** (처음엔 실패 ❌)
5. 테스트 통과할 때까지 수정 반복
6. 모든 테스트 통과하면 완성 ✅

## 🚀 시작하기

### 1. 저장소 클론 및 의존성 설치

```bash
# 저장소 클론
git clone <repository-url>
cd programers

# 의존성 설치 (pnpm 필수)
pnpm install
```

### 2. VS Code 확장 프로그램 설치

프로젝트를 VS Code로 열면 **권장 확장 프로그램 설치 알림**이 나타납니다.
"Install All" 버튼을 클릭하거나 수동으로 설치하세요:

#### 필수 확장 프로그램

- **Todo Tree** - 주차별 문제 추적 (꼭 설치!)
- **Vitest** - 테스트 실행 및 결과 확인
- **ESLint** - 코드 품질 검사
- **Prettier** - 코드 자동 포맷팅
- **SQLTools** - SQL 문법 지원

### 3. Todo Tree로 이번 주 문제 확인

1. 사이드바에서 **Todo Tree 아이콘** (체크리스트) 클릭
2. 필터에서 **`WEEK4`** 입력하여 이번 주 문제만 보기
3. 문제 클릭하면 해당 파일로 이동

## 🧪 문제 풀이 워크플로우

### Step 1: 문제 파일 열기

```typescript
// WEEK1: 여기에 코드를 작성하세요
function solution(new_id: string): string {
  // 힌트를 보고 코드 작성
  return "";
}
```

### Step 2: 테스트 실행 (실패 확인)

```bash
# 특정 세션 전체 테스트
pnpm test:run problems/session4

# 특정 문제만 테스트
pnpm test:run problems/session4/1
```

처음엔 모든 테스트가 **실패(❌)**합니다:

```
❌ 예제 1 - Expected 'bat.y.abcdefghi' but got ''
❌ 예제 2 - Expected 'z--' but got ''
```

### Step 3: 코드 작성 및 테스트 재실행

코드를 수정하고 다시 테스트:

```bash
pnpm test:run problems/session4/1
```

### Step 4: 모든 테스트 통과 확인

```
✅ 예제 1
✅ 예제 2
✅ 예제 3
Test Files  1 passed (1)
Tests  5 passed (5)
```

## 📝 문제 유형

### TypeScript 문제

```typescript
import { describe, test, expect } from "vitest";

/**
 * 문제: 신규 아이디 추천
 * 힌트:
 * 1. toLowerCase(): 대문자를 소문자로
 * 2. replace(/[^a-z0-9-_.]/g, ''): 정규식으로 특정 문자만 남기기
 */

function solution(new_id: string): string {
  // WEEK4: 여기에 코드를 작성하세요
  return "";
}

describe("신규 아이디 추천", () => {
  test("예제 1", () => {
    expect(solution("...!@BaT#*..y.abcdefghijklm")).toBe("bat.y.abcdefghi");
  });
});
```

### SQL 문제

**`.sql` 파일**에 쿼리를 작성하고, **`.ts` 파일**이 자동으로 테스트합니다:

```sql
-- problems/session4/sql/4_조건에_맞는_회원수_구하기.sql
-- 힌트:
-- 1. COUNT(*): 행의 개수 세기
-- 2. YEAR(날짜): 연도 추출
-- 3. BETWEEN A AND B: 범위 조건

-- WEEK4: 여기에 SQL을 작성하세요
```

SQL은 **MySQL 문법**으로 작성하되, 로컬 테스트는 SQLite(메모리 DB)로 자동 변환됩니다.

## 🧩 주차별 학습 주제

| 주차          | 주제                                            | 문제 수 |
| ------------- | ----------------------------------------------- | ------- |
| **Session 1** | JavaScript 기본 (배열, 문자열)                  | 8문제   |
| **Session 2** | TypeScript 기본 (타입, 수학)                    | 7문제   |
| **Session 3** | TypeScript + SQL 기초 (SELECT, WHERE, ORDER BY) | 3+3문제 |
| **Session 4** | 문자열 처리 + SQL 심화 (COUNT, CASE, GROUP BY)  | 3+5문제 |

## 🔧 유용한 명령어

```bash
# 전체 테스트 실행 (watch 모드)
pnpm test

# 전체 테스트 한 번만 실행
pnpm test:run

# 특정 세션만 테스트
pnpm test:run problems/session4

# 특정 문제만 테스트
pnpm test:run "신규 아이디"

# UI 모드로 테스트 (브라우저)
pnpm test:ui
```

## 🐛 SQL 테스트 관련 주의사항

### 프로그래머스 제출 시

프로그래머스는 **MySQL**을 사용하므로 다음 함수를 사용하세요:

- `YEAR(날짜)` - 연도 추출
- `MONTH(날짜)` - 월 추출
- `DATEDIFF(날짜1, 날짜2)` - 날짜 차이
- `DATE_FORMAT(날짜, '%Y-%m-%d')` - 날짜 포맷

### 로컬 테스트

로컬 테스트는 **SQLite (메모리 DB)**를 사용하지만, MySQL 함수가 자동으로 에뮬레이션되므로 **동일한 SQL을 그대로 사용**하면 됩니다

## 트러블슈팅

### better-sqlite3 빌드 오류 (CI/로컬)

```bash
# macOS/Linux
pnpm rebuild better-sqlite3

# 실패하면 패키지 재설치
pnpm remove better-sqlite3
pnpm add -D better-sqlite3
```

### Todo Tree가 안 보여요

1. VS Code 리로드: `Cmd/Ctrl + Shift + P` → "Developer: Reload Window"
2. Todo Tree 새로고침: Todo Tree 탭에서 새로고침 버튼 클릭
3. 확장 프로그램 재설치

### 테스트가 실행되지 않아요

```bash
# node_modules 재설치
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## 🎓 학습 리소스

- [프로그래머스](https://programmers.co.kr/) - 문제 출처
- [Vitest 문서](https://vitest.dev/) - 테스트 프레임워크
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/) - TypeScript 공식 문서
- [MySQL 튜토리얼](https://www.w3schools.com/mysql/) - SQL 학습

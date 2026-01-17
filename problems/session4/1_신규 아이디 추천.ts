import { describe, test, expect } from "vitest";

/**
 * 문제: 신규 아이디 추천
 * 레벨: 1
 * 링크: https://school.programmers.co.kr/learn/courses/30/lessons/72410
 *
 * 문제 설명:
 * 카카오에 입사한 신입 개발자 네오는 "카카오계정개발팀"에 배치되어,
 * 카카오 서비스에 가입하는 유저들의 아이디를 생성하는 업무를 담당하게 되었습니다.
 *
 * "네오"는 다음과 같이 7단계의 순차적인 처리과정을 통해 신규 유저가 입력한 아이디가
 * 카카오 아이디 규칙에 맞는 지 검사하고, 규칙에 맞지 않은 경우 규칙에 맞는 새로운 아이디를 추천해주려 합니다.
 *
 * 신규 유저가 입력한 아이디를 나타내는 new_id가 매개변수로 주어질 때,
 * "네오"가 설계한 7단계의 처리과정을 거친 후의 추천 아이디를 return 하도록 solution 함수를 완성해 주세요.
 *
 * 제한사항:
 * - new_id는 길이 1 이상 1,000 이하인 문자열입니다.
 * - new_id는 알파벳 대문자, 알파벳 소문자, 숫자, 특수문자로 구성되어 있습니다.
 *
 * 처리 과정:
 * 1단계: new_id의 모든 대문자를 대응되는 소문자로 치환합니다.
 * 2단계: new_id에서 알파벳 소문자, 숫자, 빼기(-), 밑줄(_), 마침표(.)를 제외한 모든 문자를 제거합니다.
 * 3단계: new_id에서 마침표(.)가 2번 이상 연속된 부분을 하나의 마침표(.)로 치환합니다.
 * 4단계: new_id에서 마침표(.)가 처음이나 끝에 위치한다면 제거합니다.
 * 5단계: new_id가 빈 문자열이라면, new_id에 "a"를 대입합니다.
 * 6단계: new_id의 길이가 16자 이상이면, new_id의 첫 15개의 문자를 제외한 나머지 문자들을 모두 제거합니다.
 *        만약 제거 후 마침표(.)가 new_id의 끝에 위치한다면 끝에 위치한 마침표(.) 문자를 제거합니다.
 * 7단계: new_id의 길이가 2자 이하라면, new_id의 마지막 문자를 new_id의 길이가 3이 될 때까지 반복해서 끝에 붙입니다.
 */

function solution(new_id: string): string {
  // WEEK4: 여기에 코드를 작성하세요
  return "";
}

describe("신규 아이디 추천", () => {
  test("예제 1", () => {
    expect(solution("...!@BaT#*..y.abcdefghijklm")).toBe("bat.y.abcdefghi");
  });

  test("예제 2", () => {
    expect(solution("z-+.^.")).toBe("z--");
  });

  test("예제 3", () => {
    expect(solution("=.=")).toBe("aaa");
  });

  test("예제 4", () => {
    expect(solution("123_.def")).toBe("123_.def");
  });

  test("예제 5", () => {
    expect(solution("abcdefghijklmn.p")).toBe("abcdefghijklmn");
  });
});

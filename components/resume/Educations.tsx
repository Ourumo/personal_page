import { formatPeriodMonths } from "@/lib/period";
import type { Education } from "@/types/resume";

import Section from "./Section";

const EDUCATIONS_DATA: Education[] = [
  {
    name: "[LG유플러스] 유레카 SW교육과정 4기",
    periods: [{ start: 260406, end: 261028 }],
    subtitle: "프론트엔드 트랙",
    descriptions: [
      "React와 TypeScript로 컴포넌트 설계, 상태 관리, 라우팅까지 프론트엔드 전반을 학습",
      "팀 프로젝트 '놀몽'에서 실시간 동기화 계층 구현을 맡아 배포까지 진행",
      "팀 프로젝트 '무너랑'에서 프로젝트 구조 설계와 카카오 OAuth 인증 흐름 구현을 담당",
    ],
  },
  {
    name: "네이버 커넥트재단 부스트캠프",
    periods: [{ start: 250623, end: 250808 }],
    subtitle: "부스트캠프 웹・모바일 10기 - 베이직, 챌린지 과정",
    descriptions: [
      "소켓 서버·클라이언트와 Pub/Sub 이벤트 처리를 구현하고, 멀티스레드 환경의 레이스 컨디션을 학습",
      "XML 파서, 가상 파일 시스템, 벡터DB를 JavaScript로 구현",
    ],
  },
  {
    name: "2024 벤처스타트업 아카데미",
    periods: [{ start: 240301, end: 241231 }],
    subtitle: "데이터 기반 웹/앱 개발자 양성 과정",
    descriptions: [
      "기업 연계 실습으로 한 달간 사내 전자결재 웹 서비스의 프론트엔드를 담당",
    ],
  },
  {
    name: "강남대학교",
    periods: [{ start: 190301, end: 250228 }],
    subtitle: "소프트웨어학과 전공",
    descriptions: [
      "졸업 프로젝트로 운동 추천 앱을 만들며 API 서버와 DB를 맡아 설계부터 구현까지 담당",
    ],
  },
];

const Educations = () => {
  return (
    <Section title="교육">
      <ul className="divide-y divide-border">
        {EDUCATIONS_DATA.map((education) => (
          /* 기술 스택 섹션과 같은 2열 격자를 써서 섹션 간 리듬을 맞춘다 */
          <li
            key={education.name}
            className="grid gap-1 py-6 break-keep first:pt-0 last:pb-0 sm:grid-cols-[8rem_1fr] sm:gap-4"
          >
            {education.periods.length > 0 && (
              <p className="text-sm text-muted">
                {education.periods.map(formatPeriodMonths).join(" | ")}
              </p>
            )}

            <div>
              <h3 className="text-lg font-bold text-main">{education.name}</h3>

              {education.subtitle && (
                <p className="mt-1 text-sm text-muted">{education.subtitle}</p>
              )}

              {education.descriptions.length > 0 && (
                <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5 text-sm text-sub marker:text-muted">
                  {education.descriptions.map((description) => (
                    <li key={description}>{description}</li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default Educations;

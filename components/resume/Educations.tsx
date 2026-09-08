import { formatPeriodMonths } from "@/lib/period";
import type { Education } from "@/types/resume";

import Section from "./Section";

const EDUCATIONS_DATA: Education[] = [
  {
    name: "[LG유플러스] 유레카 SW교육과정 4기",
    periods: [{ start: 260406, end: 261028 }],
    subtitle: "프론트엔드 트랙",
    descriptions: [
      "React, TypeScript 기반 웹 프론트엔드 개발 학습",
      "팀 프로젝트를 통한 협업 및 코드 리뷰 경험",
    ],
  },
  {
    name: "네이버 커넥트재단 부스트캠프",
    periods: [{ start: 250623, end: 250808 }],
    subtitle: "부스트캠프 웹・모바일 10기 - 베이직, 챌린지 과정",
    descriptions: [
      "자료구조와 알고리즘, 웹 표준 등 기초 CS 지식 학습",
      "주 단위 미션과 피어 리뷰를 통한 코드 품질 개선 훈련",
    ],
  },
  {
    name: "2024 벤처스타트업 아카데미",
    periods: [{ start: 240301, end: 241231 }],
    subtitle: "데이터 기반 웹/앱 개발자 양성 과정",
    descriptions: [
      "Java, Spring Boot 기반 백엔드 개발과 REST API 설계 학습",
      "실무형 프로젝트를 통한 요구사항 분석과 기능 구현 경험",
    ],
  },
  {
    name: "강남대학교",
    periods: [{ start: 190301, end: 250228 }],
    subtitle: "소프트웨어학과 전공",
    descriptions: [
      "프로그래밍 기초, 자료구조, 데이터베이스 등 전공 과목 이수",
      "캡스톤 디자인 프로젝트에서 웹 서비스 기획과 개발 담당",
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

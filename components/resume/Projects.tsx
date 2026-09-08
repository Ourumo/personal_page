import Link from "next/link";
import Image from "next/image";

import { formatPeriod } from "@/lib/period";
import type { CommonLink, Project } from "@/types/resume";

import { PROJECT_BUTTON_CLASS } from "./buttonStyle";
import ProjectDialog from "./ProjectDialog";
import Section from "./Section";

const PROJECTS_DATA: Project[] = [
  {
    title: "놀몽(NolMong)",
    periods: [{ start: 260714, end: 260730 }],
    meta: ["3인", "Fullstack - 30%"],
    summary:
      "실시간으로 일행과 함께 동선을 기획하고 지도 UI로 한눈에 확인하는 공동 여행 플랫폼",
    outcome:
      "Ably LiveObjects와 Zustand 양방향 연동으로 새로고침 없는 실시간 동기화 계층 구축",
    tags: ["Next.js", "Supabase", "Ably", "Zustand"],
    links: [
      {
        label: "깃허브",
        href: "https://github.com/NolMong/nolmong",
        external: true,
        svg: "/icons/GitHub.svg",
      },
      {
        label: "페이지",
        href: "https://nolmong.vercel.app/",
        external: true,
        svg: "/icons/GitHub.svg",
      },
    ],
  },
  {
    title: "운동 계획 및 맞춤형 운동 추천 앱",
    periods: [{ start: 240905, end: 241212 }],
    meta: ["3인", "Backend - 100%", "DB - 100%", "Frontend - 10%"],
    summary:
      "개인의 운동 계획 수립과 기록·추적을 돕고, 목표와 신체 정보에 맞는 루틴을 추천하는 앱",
    outcome:
      "RESTful API 서버 설계 및 구축, 로컬 DB 캐싱으로 조회 지연을 해결해 평균 5158ms 단축",
    tags: ["FastAPI", "SQLite"],
    links: [
      {
        label: "깃허브",
        href: "https://github.com/Ourumo/FitnessApp_FastAPI",
        external: true,
        svg: "/icons/GitHub.svg",
      },
      {
        label: "데모",
        href: "/fitness",
        external: false,
        svg: "/icons/GitHub.svg",
      },
    ],
  },
  {
    title: "법인 카드 관리 시스템 페이지",
    periods: [
      { start: 240701, end: 240731 },
      { start: 250515, end: 250607 },
    ],
    meta: ["2인", "Frontend - 100%"],
    summary:
      "사원의 비품 신청 내역을 직책별 결재 라인에 따라 승인 및 반려 처리하는 사내 전자결재 웹 서비스",
    outcome:
      "실제 결재 프로세스 기반 3단계 직책별 권한 분기 구조의 전자결재 프로세스 설계 및 구현",
    tags: ["React", "JavaScript", "TypeScript"],
    links: [
      {
        label: "깃허브",
        href: "https://github.com/SunJinInternShip/DeptManagement_FrontEnd",
        external: true,
        svg: "/icons/GitHub.svg",
      },
      {
        label: "데모",
        href: "/dept",
        external: false,
        svg: "/icons/GitHub.svg",
      },
    ],
  },
];

const ProjectLinkButton = ({ link }: { link: CommonLink }) => {
  const className = PROJECT_BUTTON_CLASS;

  const content = (
    <>{link.svg && <Image src={link.svg} alt="" width={16} height={16} />}</>
  );

  if (!link.external) {
    return (
      <Link href={link.href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {content}
      <span className="sr-only">(새 탭)</span>
    </a>
  );
};

const Projects = () => {
  return (
    <Section title="프로젝트">
      <ul className="flex flex-col gap-4">
        {PROJECTS_DATA.map((project) => (
          <li
            key={project.title}
            className="flex flex-col gap-2 rounded-xl border border-border bg-bg p-6"
          >
            <div>
              <h3 className="font-bold text-main">{project.title}</h3>
              <p className="mt-1 text-xs text-muted">
                {[...project.periods.map(formatPeriod)].join(" | ")}
              </p>
              <p className="mt-1 text-xs text-muted">
                {[...project.meta].join(" | ")}
              </p>
            </div>

            <div className="mt-1 text-sm">
              <p className="font-semibold text-sub">{project.summary}</p>
              <p className="mt-1 text-primary">{project.outcome}</p>
            </div>

            <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
              {project.tags.length > 0 && (
                <ul className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-border bg-bg-card px-2 py-0.5 text-xs text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}

              <div className="ml-auto flex flex-wrap gap-2">
                <ProjectDialog title={project.title}>
                  <p className="text-xs text-muted">
                    {[
                      ...project.periods.map(formatPeriod),
                      ...project.meta,
                    ].join(" · ")}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-sub">
                    {project.summary}
                  </p>
                  <p className="mt-2 text-sm text-primary">{project.outcome}</p>
                </ProjectDialog>

                {project.links.map((link) => (
                  <ProjectLinkButton key={link.href} link={link} />
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default Projects;

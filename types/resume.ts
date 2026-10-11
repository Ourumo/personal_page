// ===== 공통 =====
export interface CommonLink {
  label: string;
  href: string;
  external: boolean;
}

export interface Period {
  // YYMMDD
  start: number;
  end: number;
}

// ===== 자기소개 섹션 =====
export interface IntroduceData {
  role: string;
  name: string;
  slogan: string;
  bio: string;
  links: CommonLink[];
}

// ===== 기술 스택 섹션 =====
export interface SkillItem {
  name: string;
  svg: string;
}

export interface Skill {
  label: string;
  items: SkillItem[];
}

// ===== 프로젝트 섹션 =====
/**
 * deploy = 실제로 배포해서 돌아가는 사이트 (외부 주소)
 * demo   = 이 사이트 안에 다시 만들어 둔 데모 (내부 라우트)
 */
export type ProjectPreviewKind = 'deploy' | 'demo';

export interface ProjectPreview {
  kind: ProjectPreviewKind;
  href: string;
}

/** 문제 해결 사례의 구조도. 원본 비율대로 그리려고 크기를 함께 적는다 */
export interface ProjectArchitecture {
  /** public 아래 경로 (예: /architecture/nolmong-sync.png) */
  src: string;
  alt: string;
  width: number;
  height: number;
}

/**
 * 단계적으로 고쳐 나간 사례의 한 단계.
 * 이 단계에서 한 일과, 그 결과 새로 드러나 다음 단계로 이어진 문제를 적는다
 */
export interface ProjectIssueStage {
  title: string;
  solutions: string[];
  /** 마지막 단계는 비워 둔다 */
  revealed?: string[];
  /**
   * 버그는 아니지만 다음 단계로 발전시키게 된 한계.
   * 겪은 문제를 고친 게 아니라 점진적으로 개선한 사례는 revealed 대신 이걸 쓴다
   */
  limits?: string[];
}

interface ProjectIssueBase {
  title: string;
  /** 아키텍처 그림. 없으면 그림 없이 문제 발견부터 보여 준다 */
  architecture?: ProjectArchitecture;
  /** 문제 발견. 어떤 문제가 있었고, 알면 왜 생겼는지까지 */
  problems: string[];
  /** 해결해서 무엇이 달라졌나 */
  results: string[];
}

/**
 * 프로젝트에서 실제로 겪은 문제 하나.
 * 목록은 모두 한 줄이 하나의 항목이고, 목록마다 4줄을 넘기지 않는다.
 * 해결 과정은 한 번에 고친 사례면 solutions, 단계적으로 고친 사례면 stages 로 적는다
 */
export type ProjectIssue = ProjectIssueBase &
  (
    | { solutions: string[]; stages?: never }
    | { stages: ProjectIssueStage[]; solutions?: never }
  );

export interface Project {
  title: string;
  periods: Period[];
  meta: string[];
  summary: string;
  outcome: string;
  tags: string[];
  /** 카드 아래쪽에 펼쳐 보이는 문제 해결 사례 */
  issues: ProjectIssue[];
  /** 깃허브 저장소 주소 */
  repository?: string;
  /** 배포 사이트 또는 데모 */
  preview?: ProjectPreview;
}

// ===== 전체 =====
export interface Resume {
  introduce: IntroduceData;
  skills: Skill[];
  projects: Project[];
}

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

/**
 * 프로젝트에서 실제로 겪은 문제 하나.
 * 세 목록 모두 한 줄이 하나의 항목이다.
 */
export interface ProjectIssue {
  title: string;
  /** 어떤 문제가 발생했나. 원인을 알면 함께 적는다 */
  problems: string[];
  /** 그 문제를 어떻게 해결했나 */
  solutions: string[];
  /** 해결해서 무엇이 달라졌나 */
  results: string[];
}

/** '자세히 보기' 모달 내용 */
export interface ProjectDetail {
  /** 프로젝트 소개와 맡은 범위. 문단 하나 */
  description: string;
  issues: ProjectIssue[];
}

export interface Project {
  title: string;
  periods: Period[];
  meta: string[];
  summary: string;
  outcome: string;
  tags: string[];
  detail: ProjectDetail;
  /** 깃허브 저장소 주소 */
  repository?: string;
  /** 배포 사이트 또는 데모 */
  preview?: ProjectPreview;
}

// ===== 교육 섹션 =====
export interface Education {
  /** 학교 · 부트캠프 · 교육 과정명 */
  name: string;
  periods: Period[];
  /** 전공, 수료 과정 등 한 줄 */
  subtitle?: string;
  /** 배운 내용. 한 줄이 하나의 항목 */
  descriptions: string[];
}

// ===== 전체 =====
export interface Resume {
  introduce: IntroduceData;
  skills: Skill[];
  projects: Project[];
  educations: Education[];
}

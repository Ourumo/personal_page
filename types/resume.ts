// ===== 공통 =====
export interface CommonLink {
  label: string;
  href: string;
  external: boolean;
  svg?: string;
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
export interface Period {
  // YYMMDD
  start: number;
  end: number;
}

export interface Project {
  title: string;
  periods: Period[];
  meta: string[];
  summary: string;
  outcome: string;
  tags: string[];
  links: CommonLink[];
}

// ===== 전체 =====
export interface Resume {
  introduce: IntroduceData;
  skills: Skill[];
  projects: Project[];
}

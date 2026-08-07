// ===== 자기소개 섹션 =====
export interface IntroduceLink {
  label: string;
  href: string;
  external: boolean;
}

export interface IntroduceContent {
  role: string;
  name: string;
  slogan: string;
  links: IntroduceLink[];
}

// ===== 기술 스택 섹션 =====
export interface Skill {
  name: string;
  src: string;
}

export interface SkillGroup {
  label: string;
  items: Skill[];
}

// ===== 전체 =====
export interface ResumeContent {
  introduce: IntroduceContent;
  skills: SkillGroup[];
}

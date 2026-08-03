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

// ===== 전체 =====
export interface ResumeContent {
  introduce: IntroduceContent;
}

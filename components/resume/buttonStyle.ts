/** 프로젝트 카드 바닥의 버튼·링크가 공유하는 뼈대 */
const PROJECT_BUTTON_BASE =
  'inline-flex items-center justify-center rounded-lg border border-border bg-bg-card text-xs text-sub transition-colors hover:border-border-strong hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

/** 글자가 있는 버튼 */
export const PROJECT_BUTTON_CLASS = `${PROJECT_BUTTON_BASE} gap-1.5 px-2 py-1.5`;

/** 아이콘만 있는 버튼 — 정사각에 가깝게 */
export const PROJECT_ICON_BUTTON_CLASS = `${PROJECT_BUTTON_BASE} p-1.5`;

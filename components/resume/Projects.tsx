import Link from "next/link";

import { formatPeriod } from "@/lib/period";
import type {
  Project,
  ProjectIssue,
  ProjectPreview,
  ProjectPreviewKind,
} from "@/types/resume";

import { PROJECT_ICON_BUTTON_CLASS } from "./buttonStyle";
import ProjectDialog from "./ProjectDialog";
import { DemoIcon, DeployIcon, GitHubIcon } from "./projectIcons";
import Section from "./Section";

const PROJECTS_DATA: Project[] = [
  {
    title: "무너랑(Moonorang)",
    periods: [{ start: 260818, end: 260904 }],
    meta: ["3인", "Fullstack - 30%"],
    summary:
      "LLM 채팅으로 요금제 추천부터 가입까지 하나의 대화 흐름 안에서 처리하는 모바일 우선 웹 서비스",
    outcome:
      "카카오 OAuth 가입 미완료 사용자를 Next.js proxy 쿠키 체크와 서버 DB 가드로 이중 차단해 외래키 위반 방지",
    tags: ["Next.js", "Supabase", "Zustand"],
    detail: {
      description:
        "LLM 채팅으로 요금제 추천부터 가입까지 하나의 대화 흐름 안에서 처리하는 모바일 우선 웹 서비스입니다. 3인 팀에서 프로젝트 구조 설계, Supabase와 카카오 OAuth 기반 인증·회원가입, 상품·혜택 카탈로그, 채팅 안 부가서비스·구독 가입 절차를 맡았습니다.",
      issues: [
        {
          title: "가입을 마치지 않은 사용자의 회원용 쓰기 실패",
          problems: [
            "카카오 로그인을 마치면 인증 계정은 생기지만, 회원 레코드는 추가 정보 입력을 마쳐야 생성되는 구조",
            "그 사이 다른 화면으로 이동하면 헤더는 로그인된 것처럼 보이지만, 대화 저장 같은 회원용 쓰기가 외래키 위반으로 실패",
          ],
          solutions: [
            "1차로 Next.js proxy가 가입 미완료 표식 쿠키(httpOnly)만 확인해 가입 화면으로 리다이렉트. prefetch까지 모든 요청에서 실행되므로 DB는 조회하지 않음",
            "쿠키는 지워질 수 있다는 전제로, 2차로 회원 전용 API의 서버 가드가 DB를 직접 조회해 미인증은 401, 가입 미완료는 403으로 응답",
            "API 요청은 리다이렉트 대상에서 제외해, fetch가 JSON 대신 가입 페이지 HTML을 받아 파싱이 깨지는 문제 방지",
            "리다이렉트 응답에 갱신된 세션 쿠키를 옮겨 담아 세션 유실을 막고, 세션 없이 표식만 남아 가입·로그인 화면 사이에 갇히는 루프 처리",
          ],
          results: [
            "가입 미완료 사용자의 회원용 쓰기를 서버에서 차단해 외래키 위반 방지",
            "표식 쿠키를 지워도 비회원과 같은 경험을 할 뿐 회원 데이터는 오염되지 않음",
          ],
        },
        {
          title: "도메인이 섞이고 서버 코드가 격리되지 않던 폴더 구조",
          problems: [
            "components / hooks / lib / utils처럼 기술 종류 기준으로 나눈 폴더라, 채팅 폴더에 성향 검사 파일이 섞이는 등 도메인 경계가 무너짐",
            "LLM 시스템 프롬프트 파일이 클라이언트 코드와 같은 폴더에 있어, 실수 한 번이면 클라이언트 번들에 포함될 수 있었음",
            "라우트 파일에 로직이 몰려 채팅 API 라우트가 273줄, 채팅 페이지가 199줄까지 커짐",
          ],
          solutions: [
            "app / features / entities / shared 4레이어로 109개 파일을 재편하고, 레이어마다 '한 줄 질문'으로 판정 기준 정의",
            "import는 app → features → entities → shared 단방향만 허용하고, feature끼리의 참조 금지",
            "슬라이스마다 server/ 세그먼트를 두어 환경 변수·SDK·DB 코드를 폴더 수준에서 분리",
            "FSD 6레이어 도입과 공식 Next.js 가이드 방식을 직접 구현·검증한 뒤 롤백하고 규칙만 채택. 채택·기각 근거를 구조 가이드 문서로 팀에 공유",
          ],
          results: [
            "채팅 API 라우트 273 → 21줄, 채팅 페이지 199 → 37줄로 축소",
            "프로젝트 종료 시점까지 레이어 규칙 위반 0건 유지",
          ],
        },
        {
          title: "가입 카드 중복으로 화면이 멈추던 버그",
          problems: [
            "로그인 전후 대화가 합쳐지는 과정에서 같은 상품의 가입 카드가 두 장 복구됨",
            "두 카드가 같은 키로 서로 다른 진행 상태를 번갈아 덮어쓰면서 effect → setState → 렌더가 끝없이 반복되어 화면이 멈춤",
          ],
          solutions: [
            "'같은 상품 카드는 한 장'을 불변 조건으로 정하고, 중복되면 가장 최근 카드만 남기도록 처리",
            "버튼으로 추가할 때뿐 아니라 localStorage·DB에서 복구할 때까지, 카드가 state에 들어오는 모든 입구에 같은 규칙 적용",
            "상품 종류 분기를 exhaustive switch로 바꿔, 종류가 늘었을 때 분기를 빠뜨리면 컴파일 에러가 나도록 함",
          ],
          results: [
            "비회원 대화를 회원 계정으로 넘긴 뒤에도 같은 상품 카드가 한 장만 남아 화면 멈춤 해결",
            "상품 종류 분기 누락을 컴파일 단계에서 잡아 같은 종류의 버그 재발 방지",
          ],
        },
      ],
    },
    repository: "https://github.com/Moonorang/moonorang",
    preview: { kind: "deploy", href: "https://moonorang.vercel.app" },
  },
  {
    title: "놀몽(NolMong)",
    periods: [{ start: 260714, end: 260730 }],
    meta: ["3인", "Fullstack - 30%"],
    summary:
      "실시간으로 일행과 함께 동선을 기획하고 지도 UI로 한눈에 확인하는 공동 여행 플랫폼",
    outcome:
      "Ably LiveObjects와 Zustand 양방향 연동으로 새로고침 없는 실시간 동기화 계층 구축",
    tags: ["Next.js", "Supabase", "Ably", "Zustand"],
    detail: {
      description:
        "일행과 실시간으로 함께 여행 동선을 짜고, 지도 UI로 한눈에 확인하는 공동 여행 계획 웹 서비스입니다. 3인 팀에서 Ably LiveObjects와 Zustand를 잇는 실시간 동기화 계층, Presence 기반 동시 편집 표시, 계획 상세 페이지의 카드 추가·편집·드래그 앤 드롭을 맡았습니다. 계획 데이터를 LiveMap으로 모델링하고, 화면에 먼저 반영한 뒤 전파하는 낙관적 업데이트 구조로 새로고침 없는 동기화를 구현했습니다.",
      issues: [
        {
          title: "저장 전 카드가 통째로 사라지던 버그",
          problems: [
            "카드 추가 버튼을 누르는 즉시 Ably에 카드가 만들어져, 취소하면 다른 참여자 화면에 빈 카드가 나타났다 사라짐",
            "이를 막으려 '확인' 전까지 로컬에만 두는 draft 방식으로 바꾸자, 작성 중인 카드 하나를 지우면 작성 중이던 카드가 전부 사라지는 버그 발생",
            "원인은 Ably에서 변경을 받을 때 카드 목록을 서버 상태로 통째로 교체해, 서버에 없는 draft까지 함께 지워진 것",
          ],
          solutions: [
            "draft 카드 id를 따로 기록하고, 확인·취소할 때 목록에서 제거",
            "수신 시 교체 대신 '서버 카드 + 서버에 아직 없는 내 draft' 병합으로 변경. 서버에 같은 id가 생기면 서버 버전을 우선",
            "draft 삭제는 Ably를 거치지 않고 로컬에서만 처리하고, 페이지를 나가거나 탭을 바꿀 때 draft 정리",
          ],
          results: [
            "실시간 수신 중에도 작성 중인 카드가 유지되고, 다른 참여자가 지운 카드는 정상적으로 사라짐",
            "취소한 카드가 다른 참여자 화면에 나타났다 사라지지 않음",
          ],
        },
        {
          title: "다른 참여자의 변경이 화면에 반영되지 않던 버그",
          problems: [
            "다른 참여자가 체크리스트를 체크해도 내 화면은 그대로였고, 내가 보기 모드에서 체크한 것도 전달되지 않음",
            "다른 사람이 고친 카드를 편집으로 열면 예전 값이 떠서, 그대로 저장하면 상대의 변경을 덮어씀",
            "원인은 카드 컴포넌트가 폼 상태를 useState로 마운트 시점에 한 번만 복사하고, 보기 모드에서도 그 사본을 그린 것",
          ],
          solutions: [
            "편집 중일 때만 로컬 사본을 그리고, 보기 모드에서는 항상 실시간 원본을 그리도록 경계 분리",
            "편집을 시작하는 순간 최신 원본으로 폼을 다시 채움",
            "보기 모드의 체크는 즉시 저장으로 처리해 Ably 전파 → 원본 갱신 → 화면 반영의 단방향 흐름으로 정리",
          ],
          results: [
            "다른 참여자의 변경이 보기 화면과 편집 폼에 바로 반영되고, 오래된 값으로 덮어쓰는 문제 해결",
          ],
        },
        {
          title: "'수정 중' 표시가 남거나 잘못 지워지던 문제",
          problems: [
            "편집 상태를 공유 데이터에 저장해, 편집 도중 탭을 닫거나 연결이 끊기면 표시를 지울 주체가 없는 구조",
            "편집 중인 카드를 값 하나로 관리해, 한 탭에서 카드 여러 개를 열고 하나를 닫으면 나머지 카드의 표시까지 사라짐",
            "사용자 id를 Presence 식별자로 쓰면 같은 사람이 연 두 탭을 구분할 수 없음",
          ],
          solutions: [
            "편집 상태를 연결이 끊기면 서버가 자동으로 정리하는 Ably Presence로 이동",
            "편집 중인 카드를 배열로 관리하고, 해제는 useEffect cleanup에 맡겨 저장·취소·삭제·페이지 이동 어느 경우에도 표시가 남지 않게 함",
            "식별자는 탭마다 랜덤 UUID를 쓰고, payload에 사용자 id를 따로 실어 사람과 탭을 구분",
          ],
          results: [
            "카드마다 'OOO님 외 N명이 수정 중', '다른 탭에서 수정 중'을 구분해 표시",
            "헤더의 접속자 아바타는 같은 사람이 탭을 여러 개 열어도 한 번만 표시",
          ],
        },
        {
          title: "카드를 옮길 때마다 여러 건씩 나가던 메시지",
          problems: [
            "카드를 옮기거나 순서를 바꾸면 카드마다 따로 전송해, 바뀐 카드 수만큼 메시지가 나감",
          ],
          solutions: ["순서가 실제로 바뀐 카드만 모아 batch 하나로 전송"],
          results: ["카드 이동·재정렬 한 번에 나가는 메시지를 1건으로 축소"],
        },
      ],
    },
    repository: "https://github.com/NolMong/nolmong",
    preview: { kind: "deploy", href: "https://nolmong.vercel.app/" },
  },
  {
    title: "운동 계획 및 맞춤형 운동 추천 앱",
    periods: [{ start: 240905, end: 241212 }],
    meta: ["3인", "Backend - 100%, Frontend - 10%"],
    summary:
      "개인의 운동 계획 수립과 기록·추적을 돕고, 목표와 신체 정보에 맞는 루틴을 추천하는 앱",
    outcome:
      "RESTful API 서버 설계 및 구축, 로컬 DB 캐싱으로 조회 지연을 해결해 평균 5158ms 단축",
    tags: ["FastAPI", "SQLite"],
    detail: {
      description:
        "개인의 운동 계획 수립과 기록·추적을 돕고, 목표와 신체 정보에 맞는 루틴을 추천하는 모바일 앱입니다. 3인 팀에서 FastAPI 기반 REST API 서버(엔드포인트 25개)와 DB를 단독으로 설계·구현하고, AWS S3 이미지 저장과 EC2 배포를 맡았습니다. 앱에서는 운동 데이터 로컬 캐싱을 구현했습니다.",
      issues: [
        {
          title: "앱을 켤 때마다 느리던 운동 데이터 조회",
          problems: [
            "운동 데이터 하나에 팁·준비 자세·동작·호흡·주의사항 같은 긴 설명과 이미지·GIF URL이 포함됨",
            "앱을 켤 때마다 100개 이상의 운동 데이터를 서버에서 모두 받아와 조회·처리에 시간이 오래 걸림",
          ],
          solutions: [
            "운동 데이터를 앱 로컬 DB에 캐싱하고, 캐시가 최신인지 확인하는 방법으로 마지막 수정 시각 비교와 데이터 개수 비교를 검토",
            "수정 시각 비교는 운동 테이블에 수정 시각 컬럼이 없어 서버 DB를 다시 구축해야 했으므로, 개발 기간 안에 적용할 수 있는 개수 비교를 채택",
            "서버에 개수만 돌려주는 가벼운 API(GET /training/count)를 추가하고, 앱은 실행 시 개수가 다를 때만 전체를 다시 받아 로컬 DB를 갱신",
          ],
          results: [
            "데이터 처리 시간 평균 5158ms 단축",
            "데이터가 바뀌지 않았으면 전체를 다시 받지 않아 서버 트래픽 감소",
            "개수는 같고 내용만 바뀌면 감지하지 못하는 한계는, 관리자만 추가하고 수정이 드문 데이터 특성상 감수할 수 있다고 판단",
          ],
        },
      ],
    },
    repository: "https://github.com/Ourumo/FitnessApp_FastAPI",
    // 데모 페이지를 만들기 전까지 숨긴다
    // preview: { kind: "demo", href: "/fitness" },
  },
  {
    title: "사내 전자결재 웹 서비스",
    periods: [
      { start: 240701, end: 240731 },
      { start: 250515, end: 250607 },
    ],
    meta: ["2인", "Frontend - 100%"],
    summary:
      "사원의 비품 신청 내역을 직책별 결재 라인에 따라 승인 및 반려 처리하는 사내 전자결재 웹 서비스",
    outcome:
      "실제 결재 프로세스 기반 3단계 직책별 권한 분기 구조의 전자결재 프로세스 설계 및 구현",
    tags: ["React", "TypeScript"],
    detail: {
      description:
        "사용자의 비품 신청 내역을 직책별 결재 라인에 따라 승인·반려 처리하는 사내 전자결재 웹 서비스입니다. 프론트엔드 1명·백엔드 1명으로 구성된 팀에서 프론트엔드를 모두 맡았고, 1차(2024.07)에 기능을 구현한 뒤 2차(2025.05~06)에 인증·실시간 알림 고도화와 배포를 진행했습니다.",
      issues: [
        {
          title: "실제 업무를 반영하지 못한 단순한 결재 구조",
          problems: [
            "기획 단계에서 사용자가 신청 내역을 등록하면 관리자가 처리하는 2단계 구조로 설계·구현",
            "관리자 판별도 서버 권한이 아니라 이름 비교(name === \"admin\")에 의존",
            "기능 시연에서 실제 사용 환경을 반영하지 못한 단순한 구조라는 피드백을 받음",
          ],
          solutions: [
            "실제 회사에서 쓰는 결재 프로세스를 조사·분석하고, 기존 구조를 폐기한 뒤 약 1주간 전면 재설계",
            "권한을 사용자 · 중간 관리자 · 최고 관리자 3단계로 나누고, 서버가 내려주는 role 값으로 화면과 API 요청을 분기",
            "처리 흐름을 대기 → 상신 → 1차 결재(중간 관리자) → 2차 결재(최고 관리자) → 승인·반려로 확장",
            "화면을 대기 조회 · 주문 현황 · 상신 조회 3종으로 재구성하고, 직책마다 등록·상신·결재 권한과 조회 범위를 다르게 적용",
          ],
          results: [
            "실제 결재 프로세스를 반영한 시스템으로 시연에서 긍정적인 평가를 받음",
            "이름 비교에 의존하던 관리자 판별을 서버 role 기반 권한 분기로 대체",
          ],
        },
        {
          title: "목록을 새로 불러올 때만 갱신되던 알림",
          problems: [
            "알림을 주문 목록 조회와 함께 가져와, 결재 상태가 바뀌어도 목록을 새로 불러올 때만 알림이 갱신됨",
          ],
          solutions: [
            "알림 컴포넌트를 분리하고 5초 폴링 적용, 화면을 벗어나면 clearInterval로 정리",
            "페이지를 이동하면 알림이 초기화되는 문제는 Redux Toolkit 전역 상태로 해결",
            "5초마다 보내는 GET 요청을 없애기 위해 WebSocket으로 전환. 헤더를 보낼 수 없는 제약은 연결 URL의 쿼리스트링으로 토큰을 전달해 해결",
            "소켓은 useRef로 보관해 리렌더와 무관하게 유지하고, 화면을 벗어나면 연결 해제",
          ],
          results: ["5초 주기 요청 없이 결재 상태 변경을 실시간 알림으로 받음"],
        },
      ],
    },
    repository: "https://github.com/SunJinInternShip/DeptManagement_FrontEnd",
    // 데모 페이지를 만들기 전까지 숨긴다
    // preview: { kind: "demo", href: "/dept" },
  },
];

const PREVIEW_META: Record<
  ProjectPreviewKind,
  { label: string; Icon: () => React.ReactElement }
> = {
  deploy: { label: "배포 사이트", Icon: DeployIcon },
  demo: { label: "데모", Icon: DemoIcon },
};

/**
 * 배포 사이트는 바깥 주소라 새 탭으로, 데모는 이 사이트 안의 라우트라
 * next/link 로 보낸다. 아이콘만 있는 버튼이므로 이름은 sr-only 로 따로 준다.
 */
const ProjectPreviewButton = ({
  title,
  preview,
}: {
  title: string;
  preview: ProjectPreview;
}) => {
  const { label, Icon } = PREVIEW_META[preview.kind];
  const name = `${title} ${label}`;

  if (preview.kind === "demo") {
    return (
      <Link
        href={preview.href}
        title={label}
        className={PROJECT_ICON_BUTTON_CLASS}
      >
        <Icon />
        <span className="sr-only">{name}</span>
      </Link>
    );
  }

  return (
    <a
      href={preview.href}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
      className={PROJECT_ICON_BUTTON_CLASS}
    >
      <Icon />
      <span className="sr-only">{name} (새 탭)</span>
    </a>
  );
};

/* 교육 섹션의 설명 목록과 같은 모양을 쓴다 */
const ProjectIssueStep = ({
  label,
  items,
}: {
  label: string;
  items: string[];
}) => (
  <div className="mt-3">
    <h5 className="text-xs font-semibold text-muted">{label}</h5>
    <ul className="mt-1.5 flex list-disc flex-col gap-1.5 pl-5 text-sm text-sub marker:text-muted">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);

/** 문제 하나를 제기 → 해결 → 결과 순서로 묶은 상자. 모달 제목이 h3 이라 h4 부터 */
const ProjectIssueCard = ({ issue }: { issue: ProjectIssue }) => (
  <section className="rounded-xl border border-border bg-bg p-4">
    <h4 className="text-sm font-bold text-main">{issue.title}</h4>
    <ProjectIssueStep label="문제 발견" items={issue.problems} />
    <ProjectIssueStep label="문제 해결" items={issue.solutions} />
    <ProjectIssueStep label="결과" items={issue.results} />
  </section>
);

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
                {project.periods.map(formatPeriod).join(" | ")}
              </p>
              <p className="mt-1 text-xs text-muted">
                {project.meta.join(" | ")}
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

              <div className="ml-auto flex flex-wrap items-center gap-2">
                <ProjectDialog title={project.title}>
                  <h4 className="text-sm font-bold text-main">
                    프로젝트 설명
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-sub">
                    {project.detail.description}
                  </p>

                  <div className="mt-6 flex flex-col gap-4">
                    {project.detail.issues.map((issue) => (
                      <ProjectIssueCard key={issue.title} issue={issue} />
                    ))}
                  </div>
                </ProjectDialog>

                {project.repository && (
                  <a
                    href={project.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="깃허브 저장소"
                    className={PROJECT_ICON_BUTTON_CLASS}
                  >
                    <GitHubIcon />
                    <span className="sr-only">
                      {project.title} 깃허브 저장소 (새 탭)
                    </span>
                  </a>
                )}

                {project.preview && (
                  <ProjectPreviewButton
                    title={project.title}
                    preview={project.preview}
                  />
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default Projects;

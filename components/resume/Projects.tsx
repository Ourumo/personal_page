import Image from "next/image";
import Link from "next/link";

import { formatPeriod } from "@/lib/period";
import type {
  Project,
  ProjectIssue,
  ProjectIssueStage,
  ProjectPreview,
  ProjectPreviewKind,
} from "@/types/resume";

import { PROJECT_ICON_BUTTON_CLASS } from "./buttonStyle";
import { DemoIcon, DeployIcon, GitHubIcon } from "./projectIcons";
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
    issues: [
      {
        title:
          "작성 중인 카드 관리 방식을 즉시 전파 → draft 도입 → 수신 병합 순으로 개선",
        architecture: {
          src: "/architecture/nolmong-1.png",
          alt: "즉시 전파 구조에서 빈 카드가 다른 참여자에게 공유되던 문제와, draft 도입 후 서버 스냅샷 덮어쓰기로 draft가 사라지던 문제를 수신 병합으로 해결한 흐름",
          width: 1920,
          height: 1080,
        },
        problems: [
          "작성자가 카드 추가 버튼을 누르는 순간, 내용이 비어 있는 카드가 다른 참여자 화면에도 동시에 생성되는 문제 발견",
          "작성자가 이를 취소하면 그 빈 카드가 다른 참여자 화면에서 갑자기 사라지는 버그 발생",
          "다른 참여자가 그 빈 카드를 편집하던 중에 작성자가 취소하면 그 참여자가 입력한 내용까지 삭제되는 버그 발생",
        ],
        stages: [
          {
            title:
              "새 카드를 확인 전까지 로컬 draft로 두어 Ably 생성 시점 지연",
            solutions: [
              "addCard는 로컬 store에만 카드를 추가하고 Ably 전파를 생략해, 임시 카드인 draft를 공유 상태와 분리",
              "확인 시점에 처음 pushCardCreate로 Ably에 생성하고, 취소는 로컬에서만 제거해 다른 참여자에게 draft가 노출되지 않도록 처리",
            ],
            revealed: [
              "draft를 작성하는 중에 다른 참여자가 카드를 등록하거나 삭제하면 작성 중이던 draft가 전부 사라지는 버그 발생",
            ],
          },
          {
            title:
              "setCards의 전체 덮어쓰기를 서버 스냅샷 + 로컬 draft 병합으로 변경",
            solutions: [
              "Ably 구독 콜백이 호출하는 setCards가 수신한 서버 스냅샷으로 로컬 cards를 덮어쓰는데, draft와 서버 카드가 한 배열(cards)에 섞여 있어 draft까지 소실되는 것을 원인으로 파악",
              "draftCardIds로 draft를 별도 추적해, 추가 시 등록하고 확인·취소 시 해제하는 방식으로 draft 생명주기 관리",
              "setCards를 '서버 스냅샷 + 서버에 없는 로컬 draft' 병합으로 바꾸고, 같은 id가 서버 스냅샷에 생기면 서버 버전을 우선해 확인 직후 에코로 인한 중복 방지",
              "모듈 스코프 store라 draft가 다른 계획 화면으로 누수되지 않도록, 페이지 이탈·탭 전환 시점에 draft 정리",
            ],
          },
        ],
        results: [
          "다른 참여자 화면에 빈 카드가 생기지 않아, 빈 카드를 함께 편집하다 입력이 지워지는 문제를 차단함",
          "실시간 수신 중에도 작성 중인 카드가 유지되고, 다른 참여자가 지운 카드는 정상적으로 사라짐",
          "작성한 카드를 확인한 직후에도 같은 카드가 두 장으로 늘어나지 않음",
        ],
      },
      {
        title:
          "다른 참여자의 변경이 반영되지 않던 버그를 실시간 원본과 편집용 사본 분리로 해결",
        architecture: {
          src: "/architecture/nolmong-2.png",
          alt: "마운트 때 한 번 복사한 사본을 보기 화면과 편집 폼이 계속 써서 변경이 반영되지 않던 구조와, 보기는 원본·편집만 사본을 쓰고 체크와 저장을 onUpdate로 단방향 전파하도록 바꾼 구조",
          width: 1920,
          height: 1080,
        },
        problems: [
          "보기 모드에서 체크리스트의 체크박스를 누르면 체크된 것처럼 보이고 실제로는 저장되지 않아, 다른 참여자에게 전달되지 않는 문제 발견",
          "다른 참여자가 편집 모드에서 체크리스트를 편집하고 저장해도, 이미 열려 있던 화면은 갱신되지 않아 새로고침해야 반영되는 버그 발생",
          "다른 참여자가 고친 카드를 편집 모드로 열면 편집 폼 전체에 페이지를 처음 열었을 때의 값이 나타나, 저장 시 그 변경을 덮어쓰는 버그 발생",
        ],
        solutions: [
          "useState 초기값은 마운트 시 한 번만 평가되는데 원본(data prop)을 사본(form state)으로 복사해 쓰는 미러링 구조라, Ably로 갱신된 원본 대신 오래된 사본이 렌더링·저장되는 것을 원인으로 파악",
          "렌더링 소스를 isEditing으로 분기해, 보기 모드는 항상 원본을, 편집 모드에서만 사본을 렌더링하도록 단일 원본 경계 설정",
          "useEffect로 매번 동기화하는 대신 편집 진입 핸들러에서만 최신 원본으로 사본을 재초기화해, 편집 중 입력이 원격 변경에 덮이지 않도록 처리",
          "보기 모드 체크 토글을 사본을 바꾸는 setState가 아닌 최신 원본 기반 onUpdate로 바꿔 'onUpdate → Ably 전파 → store 갱신 → 리렌더'의 단방향 데이터 흐름 확립",
        ],
        results: [
          "보기 모드에서 체크하면 바로 저장되어, 모든 참여자의 화면에 즉시 반영됨",
          "편집을 열면 항상 최신 값에서 시작해, 오래된 값으로 덮어쓰지 않음",
        ],
      },
      {
        title:
          "'수정 중' 표시가 계속 남거나 잘못 지워지던 문제를 Ably Presence로 해결",
        architecture: {
          src: "/architecture/nolmong-3.png",
          alt: "편집 여부를 LiveObjects와 payload의 단일 값으로 관리해 '수정 중' 표시가 남거나 사라지던 구조와, Ably Presence로 옮기고 편집 카드를 배열로 관리하며 clientId는 탭 단위·userId는 참여자 단위로 나눈 구조",
          width: 1920,
          height: 1080,
        },
        problems: [
          "편집 중에 탭을 닫거나 연결이 끊기면, 다른 참여자 화면에 '수정 중' 표시가 계속 남는 문제 발견",
          "한 탭에서 카드 여러 개를 편집하다 하나를 닫으면, 나머지 카드의 '수정 중' 표시까지 함께 사라지는 문제 발견",
          "같은 참여자가 여러 탭으로 접속하면, 자신의 다른 탭에서 편집 중인 것을 알 수 없거나 참여자 아바타에 여러 번 나타나는 문제 발견",
        ],
        solutions: [
          "연결 수명에 묶인 휘발성 상태인 편집 여부를 LiveObjects에 저장하고, 편집 카드도 payload의 단일 값으로 덮어써, 연결 종료·다중 편집 시 상태를 정리할 수 없는 것을 원인으로 파악",
          "편집 상태를 연결 수명과 함께 관리되는 Ably Presence로 이전해, 연결이 끊기면 서버가 자동으로 leave 처리하고, 연결이 유지되는 페이지 이동 시에는 직접 leave 호출",
          "편집 카드를 editingCardIds 배열로 바꿔 카드별로 추가·제거하되 변경이 없으면 presence update를 생략하고, 해제는 useEffect cleanup에 맡겨 저장·취소·삭제·언마운트 어느 경로에서도 표시가 남지 않도록 처리",
          "clientId는 탭마다 crypto.randomUUID()로 발급하고 payload에 userId를 실어, 연결 식별은 탭 단위·화면 표시는 참여자 단위로 기준을 분리",
        ],
        results: [
          "탭을 닫거나 연결이 끊겨도 '수정 중' 표시가 남지 않음",
          "한 탭에서 카드 여러 개를 편집해도 카드마다 '수정 중' 표시가 따로 유지됨",
          "카드마다 편집 중인 참여자가 '수정 중', '다른 탭에서 수정 중', 'OOO님 외 N명이 수정 중'으로 구분되어 표시됨",
          "헤더의 참여자 아바타는 탭을 여러 개 열어도 참여자당 한 번만 표시됨",
        ],
      },
      {
        title: "카드 이동 시 화면이 튀던 문제를 batch 전송으로 해결",
        architecture: {
          src: "/architecture/nolmong-4.png",
          alt: "카드마다 따로 보낸 변경의 에코가 하나씩 돌아오며 낙관적 업데이트한 순서를 덮어쓰던 구조와, 이동과 재정렬을 LiveMap batch 1건으로 묶어 모든 변경이 반영된 스냅샷만 에코로 받도록 바꾼 구조",
          width: 1920,
          height: 1080,
        },
        problems: [
          "카드를 다른 날짜로 옮기거나 순서를 바꾸면, 카드 위치가 여러 번에 걸쳐 바뀌며 화면이 튀는 버그 발생",
          "카드 하나만 옮겨도 순서가 바뀐 카드 수만큼 메시지가 전송되는 문제 발견",
        ],
        solutions: [
          "카드마다 따로 보낸 변경의 에코가 하나씩 돌아오며, 일부만 반영된 서버 스냅샷이 낙관적 업데이트한 순서를 덮어쓰는 것을 원인으로 파악",
          "날짜 이동과 출발지 재정렬은 pushCardMove, 같은 날짜 안의 재정렬은 pushCardOrders로 묶어 LiveMap batch 1건으로 전송",
          "모든 변경이 함께 적용된 서버 스냅샷만 에코로 돌아오게 해, 낙관적 업데이트와 수신 결과가 같은 최종 상태로 수렴하도록 정리",
        ],
        results: [
          "카드를 옮기면 낙관적 업데이트로 반영한 순서가 그대로 유지되어 화면이 튀지 않음",
          "한 번의 이동에 나가는 메시지가 바뀐 카드 수만큼에서 1건으로 줄어, 참여자 수에 비례해 커지던 Ably 메시지 사용량도 절감됨",
        ],
      },
    ],
    repository: "https://github.com/NolMong/nolmong",
    preview: { kind: "deploy", href: "https://nolmong.vercel.app/" },
  },
  {
    title: "사내 전자결재 웹 서비스(ApprovalLine)",
    periods: [
      { start: 240701, end: 240731 },
      { start: 250515, end: 250607 },
    ],
    meta: ["2인", "Frontend - 100%"],
    summary:
      "사원의 비품 신청 내역을 직책별 결재 라인에 따라 승인 및 반려 처리하는 사내 전자결재 웹 서비스",
    outcome:
      "실제 결재 프로세스 기반 3단계 직책별 권한 분기 구조의 전자결재 프로세스 설계 및 구현",
    tags: ["React", "TypeScript", "Redux Toolkit", "WebSocket"],
    issues: [
      {
        title:
          "실제 업무를 반영하지 못한 결재 구조를 role 기반 3단계 권한 구조로 재설계",
        architecture: {
          src: "/architecture/approvalline-1.png",
          alt: "관리자를 userName 비교로 판별하고 대기·승인·반려만으로 바로 처리하던 2단계 구조와, 로그인 응답의 role로 라우트·화면·API를 분기하고 결재 상태 전이와 직책별 권한·화면·조회 범위를 나눈 3단계 구조",
          width: 1920,
          height: 1080,
        },
        problems: [
          "기능 시연에서 실제 업무를 반영하지 못했다는 피드백을 받고, 사용자가 신청하면 관리자가 바로 승인·반려하는 2단계 구조로는 직책별 결재 라인을 표현할 수 없는 문제 발견",
          "결재 상태가 대기·승인·반려뿐이라, 신청 건이 결재 라인의 어느 단계에 있는지 알 수 없는 문제 발견",
          '관리자 여부를 권한이 아닌 userName === "admin" 비교로 판별해, 직책별 권한을 나눌 수 없는 문제 발견',
        ],
        solutions: [
          "권한이 관리자·사용자 이분법이고 결재가 단일 상태 변경으로 끝나, 직책별 결재 단계와 권한을 표현할 도메인 모델이 없는 것을 원인으로 파악",
          "실제 기업의 결재 프로세스를 분석해 권한을 사용자·중간 관리자·최고 관리자 3단계 role로 재정의하고, 로그인 응답의 role을 단일 기준으로 진입 라우트 · 라우트 가드 · 탭 노출 · API 엔드포인트를 일괄 분기",
          "결재를 대기 → 상신 → 1차 결재 → 2차 결재 → 승인·반려의 상태 전이로 모델링해 role마다 처리할 수 있는 전이를 제한하고, 반려 전이는 사유 입력을 요청 전 검증 조건으로 추가",
          "화면을 대기 조회·주문 현황·상신 조회 3종으로 재구성하고, role별 등록·수정·삭제·상신·결재 권한과 데이터 조회 범위(본인 · 팀 · 전체)를 화면 단위로 분리",
        ],
        results: [
          "결재 건이 중간 관리자 → 최고 관리자 순으로 단계마다 승인·반려되어, 실제 결재 라인과 유사한 흐름으로 처리됨",
          "신청 건이 1차·2차 처리중으로 구분되어, 결재 라인의 어느 단계에 있는지 바로 확인됨",
          "userName 비교 대신 role로 직책을 판별해, 접근할 수 있는 화면과 조회 범위를 나눔",
          "기존 구조를 폐기하고 약 1주 만에 재설계한 시스템으로 시연에서 긍정적인 평가를 받음",
        ],
      },
      {
        title:
          "토큰 재발급 후에도 인증에 실패하던 문제를 요청 시점 토큰 조회로 해결",
        architecture: {
          src: "/architecture/approvalline-2.png",
          alt: "렌더 시점에 읽어 둔 만료 토큰으로 요청하고 재발급 응답의 null이 사용자 정보를 덮어쓰던 구조와, 요청 시점마다 최신 토큰을 읽고 재발급 성공 시 값이 있는 필드만 저장·실패 시 로그아웃으로 분기하는 구조",
          width: 1920,
          height: 1080,
        },
        problems: [
          "refreshToken으로 토큰을 재발급받은 뒤에도 API 요청이 계속 인증에 실패하는 버그 발생",
          "재발급 응답에는 userName · role이 null로 내려와, 그대로 저장하면 기존 사용자 정보가 null로 덮어써지는 문제 발견",
        ],
        solutions: [
          "각 컴포넌트에서 렌더 시점에 읽어 둔 accessToken을 핸들러가 클로저로 참조해, 재발급으로 localStorage가 갱신돼도 만료된 토큰으로 요청하는 것을 원인으로 파악",
          "토큰을 변수로 캡처하던 페이지 · 모달 · 상단바 등 7개 파일에서 변수를 제거하고, 요청 직전에 GetUserInfo()로 localStorage의 최신 토큰을 조회하도록 변경",
          "SetUserInfo가 응답 값을 전부 저장하던 방식을 값이 있는 필드만 저장하도록 바꿔, 재발급 응답의 null이 기존 userName · role을 덮어쓰지 않도록 처리",
          "재발급에 실패하면(refreshToken 만료) 사용자 정보를 초기화하고 로그인 화면으로 리다이렉트하되, 저장 · 삭제 함수를 boolean을 반환하는 동기 함수로 바꿔 성공했을 때만 라우팅 처리",
        ],
        results: [
          "재발급된 토큰이 다음 요청부터 바로 적용되어, 인증 실패가 반복되지 않음",
          "토큰을 재발급해도 userName과 role이 유지되어, role 기반 화면 분기가 깨지지 않음",
          "refreshToken까지 만료되면 로그인 화면으로 이동해, 만료된 세션에 머무르지 않음",
        ],
      },
      {
        title:
          "목록 조회에 묶여 있던 알림을 5초 폴링 → WebSocket · Redux Toolkit store 순으로 개선",
        architecture: {
          src: "/architecture/approvalline-3.png",
          alt: "대기 조회 화면의 목록 조회에 묶여 있던 알림을, 컴포넌트로 분리한 5초 폴링에서 WebSocket 구독과 Redux Toolkit 전역 store 누적으로 단계적으로 개선한 흐름",
          width: 1920,
          height: 1080,
        },
        problems: [
          "결재 상태가 바뀌어도 대기 조회 목록을 다시 불러오기 전까지 알림이 갱신되지 않는 문제 발견",
          "알림이 대기 조회 화면에만 표시되어, 주문 현황 · 상신 조회 화면에서는 알림을 확인할 수 없는 문제 발견",
        ],
        stages: [
          {
            title: "알림 조회를 목록 조회에서 분리하고 5초 폴링으로 갱신",
            solutions: [
              "알림 조회가 대기 조회 화면의 목록 조회 함수 안에 묶여 있어, 목록을 불러올 때만 알림을 받아 오는 것을 원인으로 파악",
              "알림을 독립된 Notification 컴포넌트로 분리해 대기 조회 · 주문 현황 · 상신 조회 화면에 배치",
              "useEffect에서 setInterval로 5초마다 조회하고, cleanup의 clearInterval로 화면 이동 시 타이머 정리",
            ],
            limits: [
              "알림이 없어도 5초마다 요청이 반복되고, 상태 변경이 최대 5초 늦게 반영됨",
            ],
          },
          {
            title:
              "폴링을 WebSocket 구독으로 바꾸고 수신한 알림을 Redux Toolkit store에 누적",
            solutions: [
              "브라우저 WebSocket API는 커스텀 헤더를 지원하지 않아, 인증 토큰을 쿼리스트링으로 전달해 연결",
              "소켓 인스턴스는 useRef로 보관해 리렌더와 무관하게 유지하고, useEffect cleanup에서 close()로 연결 해제",
              "WebSocket은 연결 이후의 새 알림만 받아 컴포넌트 state에 두면 화면 이동 시 사라지므로, 수신 메시지를 addNotification으로 dispatch해 Redux Toolkit 전역 store에 누적",
            ],
          },
        ],
        results: [
          "주기적인 요청 없이, 결재 상태가 바뀌면 알림을 바로 받음",
          "대기 조회 · 주문 현황 · 상신 조회 어느 화면에서든 알림이 표시됨",
          "화면을 이동해도 받은 알림이 유지됨",
        ],
      },
    ],
    repository: "https://github.com/Ourumo/ApprovalLine",
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

/* 문제 해결 사례 안의 한 단계. 라벨에는 점을 찍지 않고, 내용에만 점을 찍는다 */
const ProjectIssueStep = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <li>
    <span className="font-semibold text-main">{label}</span>
    {children}
  </li>
);

const ProjectIssueItems = ({ items }: { items: string[] }) => (
  <ul className="mt-1.5 flex list-disc flex-col gap-1.5 pl-5 text-sub marker:text-muted">
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

/**
 * 단계적으로 고쳐 나간 사례의 해결 과정.
 * 단계마다 한 일을 적고, 그 결과 드러난 문제가 다음 단계로 이어지게 보여 준다
 */
const ProjectIssueStages = ({ stages }: { stages: ProjectIssueStage[] }) => (
  <ol className="mt-2 flex flex-col gap-3">
    {stages.map((stage, index) => (
      <li key={stage.title}>
        <p className="font-medium text-main">
          {index + 1}. {stage.title}
        </p>
        <ProjectIssueItems items={stage.solutions} />
        {stage.revealed && (
          <ProjectIssueStageNote
            label="새로운 문제"
            items={stage.revealed}
            labelClass="text-error"
            markerClass="marker:text-error"
          />
        )}
        {stage.limits && (
          <ProjectIssueStageNote
            label="한계"
            items={stage.limits}
            labelClass="text-warning"
            markerClass="marker:text-warning"
          />
        )}
      </li>
    ))}
  </ol>
);

/* 단계 끝에 붙는 메모. 다음 단계로 넘어간 이유를 보여 준다 */
const ProjectIssueStageNote = ({
  label,
  items,
  labelClass,
  markerClass,
}: {
  label: string;
  items: string[];
  labelClass: string;
  markerClass: string;
}) => (
  <div className="mt-2 pl-5">
    <p className={`text-xs font-semibold ${labelClass}`}>{label}</p>
    <ul
      className={`mt-1 flex list-disc flex-col gap-1.5 pl-5 text-sub ${markerClass}`}
    >
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);

/**
 * 문제 하나를 아키텍처 그림 → 문제 발견 → 해결 과정 → 결과 순서로 적는다.
 * 프로젝트 제목이 h3 이라 h4 부터
 */
const ProjectIssueCard = ({
  issue,
  order,
}: {
  issue: ProjectIssue;
  order: number;
}) => {
  const { architecture } = issue;

  return (
    <section>
      <h4 className="font-bold text-main">
        {order}. {issue.title}
      </h4>

      {architecture && (
        <Image
          src={architecture.src}
          alt={architecture.alt}
          width={architecture.width}
          height={architecture.height}
          className="mt-3 h-auto w-full rounded-lg border border-border bg-bg-card"
        />
      )}

      <ul className="mt-4 flex flex-col gap-4 text-sm">
        <ProjectIssueStep label="문제 발견">
          <ProjectIssueItems items={issue.problems} />
        </ProjectIssueStep>

        <ProjectIssueStep label="해결 과정">
          {issue.stages ? (
            <ProjectIssueStages stages={issue.stages} />
          ) : (
            <ProjectIssueItems items={issue.solutions} />
          )}
        </ProjectIssueStep>

        <ProjectIssueStep label="결과">
          <ProjectIssueItems items={issue.results} />
        </ProjectIssueStep>
      </ul>
    </section>
  );
};

/**
 * 프로젝트가 몇 개 없으므로 모달에 숨기지 않고 카드 안에 모두 펼친다.
 * 위쪽(태그·요약·성과)만 훑어도 되고, 아래쪽(문제 해결 사례)까지 읽어도 되게 나눈다.
 */
const Projects = () => {
  return (
    <Section title="프로젝트">
      <ul className="flex flex-col gap-6">
        {PROJECTS_DATA.map((project) => (
          <li
            key={project.title}
            className="rounded-xl border border-border bg-bg p-6 break-keep sm:p-8"
          >
            {project.tags.length > 0 && (
              <ul className="mb-3 flex flex-wrap gap-1.5">
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

            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-main">{project.title}</h3>
                <p className="mt-1 text-xs text-muted">
                  {project.periods.map(formatPeriod).join(" | ")}
                </p>
                <p className="mt-1 text-xs text-muted">
                  {project.meta.join(" | ")}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
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

            <div className="mt-4 text-sm">
              <p className="font-semibold text-sub">{project.summary}</p>
              <p className="mt-1 text-primary">{project.outcome}</p>
            </div>

            <div className="mt-6 flex flex-col gap-8 border-t border-border pt-6">
              {project.issues.map((issue, index) => (
                <ProjectIssueCard
                  key={issue.title}
                  issue={issue}
                  order={index + 1}
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default Projects;

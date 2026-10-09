import { CommonLink, IntroduceData } from "@/types/resume";
import styles from "./Introduce.module.css";
import IntroduceInspector from "./IntroduceInspector";

const INTRODUCE_LINKS: CommonLink[] = [
  { label: "GitHub", href: "https://github.com/Ourumo", external: true },
  { label: "이메일", href: "mailto:ss8638@naver.com", external: false },
];

const INTRODUCE_DATA: IntroduceData = {
  role: "Frontend Developer",
  name: "이규태",
  slogan: "누가 언제 바꾸든, 모두가 같은 화면을 보게 만듭니다.",
  bio: "여러 사람이 함께 쓰는 화면의 상태를 다뤄 왔습니다. 실시간 여행 계획 협업 서비스에서는 참여자 간 데이터가 어긋나지 않도록 동기화 계층을 만들었고, 사내 전자결재 서비스에서는 실제 결재 흐름을 직책별 권한 구조로 옮겼습니다.",
  links: INTRODUCE_LINKS,
};

export default function Introduce() {
  return (
    <section className="relative flex min-h-[70svh] items-center border-b border-border py-20">
      {/* 아래 섹션들이 서 있는 격자를 hero 에서만 눈에 보이게 그린다.
          좁은 화면은 격자가 1열로 무너지므로 선도 함께 감춘다 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-[80%] max-w-275 -translate-x-1/2 sm:block"
      >
        {/* 라벨 칼럼과 본문 칼럼 사이 = gap-x-10 의 한가운데 */}
        <span
          className={`${styles.rule} absolute inset-y-0 left-[9.25rem] w-px bg-border`}
        />
        {/* 본문이 넘지 않는 오른쪽 한계 = max-w-275 */}
        <span
          className={`${styles.rule} ${styles.ruleRight} absolute inset-y-0 right-0 w-px bg-border`}
        />
      </div>

      <div className="relative mx-auto grid w-[80%] max-w-275 gap-2 break-keep sm:grid-cols-[8rem_1fr] sm:gap-x-10">
        <p
          data-inspect="p"
          className={`${styles.role} text-sm text-sub sm:pt-3`}
        >
          {INTRODUCE_DATA.role}
        </p>

        <div className="flex flex-col items-start gap-6 sm:pr-10">
          <h1
            data-inspect="h1"
            className={`${styles.name} text-[clamp(4rem,10vw,9rem)] leading-none font-bold tracking-[-0.03em] text-main`}
          >
            {INTRODUCE_DATA.name}
          </h1>

          <h2
            data-inspect="h2"
            className={`${styles.slogan} max-w-xl text-xl font-medium text-main sm:text-2xl`}
          >
            {INTRODUCE_DATA.slogan}
          </h2>

          <h3
            data-inspect="h3"
            className={`${styles.bio} max-w-xl text-sm leading-relaxed text-sub sm:text-base`}
          >
            {INTRODUCE_DATA.bio}
          </h3>

          <ul
            data-inspect="ul"
            className={`${styles.links} mt-1 flex flex-wrap items-center gap-x-6 gap-y-2`}
          >
            {INTRODUCE_DATA.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="rounded-sm text-sm font-medium text-sub underline-offset-4 hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <IntroduceInspector />
    </section>
  );
}

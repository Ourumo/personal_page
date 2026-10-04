import Educations from "@/components/resume/Educations";
import Introduce from "@/components/resume/Introduce";
import Projects from "@/components/resume/Projects";
import Skills from "@/components/resume/Skills";

/* '진행 중' 표시가 렌더 시점의 날짜에 의존한다.
   정적 페이지라 빌드 때 박힌 값이 그대로 남으므로, 하루에 한 번 다시 만들어
   교육 과정이 끝나면 저절로 '진행 중'이 걷히게 한다.
   (revalidate 는 정적 분석이 되어야 해서 계산식이 아닌 숫자여야 한다) */
export const revalidate = 86400;

export default function Resume() {
  return (
    <main className="bg-bg">
      {/* section 1 - 자기소개 */}
      <Introduce />

      {/* section 2 - 기술 스택 */}
      <Skills />

      {/* section 3 - 프로젝트 */}
      <Projects />

      {/* section 4 - 교육 */}
      <Educations />
    </main>
  );
}

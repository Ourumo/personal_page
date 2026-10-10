import Introduce from "@/components/resume/Introduce";
import Projects from "@/components/resume/Projects";
import Skills from "@/components/resume/Skills";

export default function Resume() {
  return (
    <main className="bg-bg">
      {/* section 1 - 자기소개 */}
      <Introduce />

      {/* section 2 - 기술 스택 */}
      <Skills />

      {/* section 3 - 프로젝트 */}
      <Projects />
    </main>
  );
}

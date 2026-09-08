import Introduce from '@/components/resume/Introduce';
import Projects from '@/components/resume/Projects';
import Skills from '@/components/resume/Skills';

export default function Resume() {
  return (
    <main className='bg-bg'>
      {/* section 1 - 자기소개 */}
      <Introduce />

      {/* section 2 - 기술 스택 */}
      <Skills />

      {/* section 3 - 프로젝트 */}
      <Projects />

      {/* section 4 - 교육 */}
      <section className='flex flex-col'>
        <h2>교육</h2>
        <div>유레카</div>
        <div>부스트캠프</div>
        <div>벤처아카데미</div>
        <div>졸업</div>
      </section>
    </main>
  );
}

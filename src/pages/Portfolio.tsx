const Portfolio = () => {
  return (
    <main>
      {/* Section 1 - 자기소개 */}
      <section>
        <h1>이규태</h1>
        <h2>슬로건</h2>
        <p>자기소개</p>
        <div>
          <nav>github</nav>
          <nav>자소서</nav>
        </div>
      </section>

      {/* Section 2 - 기술 스택 */}
      <section>
        <h2>기술 스택</h2>
        <dl>
          <dt>언어</dt>
          <dd>자바스크립트</dd>
        </dl>
        <dl>
          <dt>프론트엔드</dt>
          <dd>리액트</dd>
        </dl>
      </section>

      {/* Section 3 - 프로젝트 */}
      <section>
        <h2>프로젝트</h2>
        <article>
          <h3>1번 프로젝트</h3>
          <time>00.00.00 - 00.00.00</time>
        </article>
      </section>

      {/* Section 4 - 교육 */}
      <section>
        <h2>교육</h2>
        <article>
          <h3>OOOO</h3>
          <time>00.00.00 - 00.00.00</time>
        </article>
      </section>

      {/* Section 5 - 연락처 */}
      <section>
        <h2>연락처</h2>
        <address></address>
      </section>

      {/* Footer -  */}
      <footer>~~~~~~</footer>
    </main>
  );
};

export default Portfolio;

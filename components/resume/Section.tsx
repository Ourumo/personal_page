import type { ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
}

export default function Section({ title, children }: SectionProps) {
  /* 아래 여백까지 주면 섹션 사이가 두 배로 벌어지므로 위쪽만 준다.
     마지막 섹션 아래 여백은 페이지(main)가 맡는다 */
  return (
    <section className='mx-auto w-[80%] max-w-275 pt-12 sm:pt-16'>
      <h2 className='mb-4 text-2xl font-bold text-sub uppercase tracking-wide'>
        {title}
      </h2>

      <div className='rounded-2xl border border-border bg-bg-card p-6 shadow-card sm:p-8 duration-200 hover:shadow-card-strong'>
        {children}
      </div>
    </section>
  );
}

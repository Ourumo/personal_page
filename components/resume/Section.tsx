import type { ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
}

export default function Section({ title, children }: SectionProps) {
  return (
    <section className='mx-auto w-[80%] max-w-275 py-12 sm:py-16'>
      <h2 className='mb-4 text-2xl font-bold text-sub uppercase tracking-wide'>
        {title}
      </h2>

      <div className='rounded-2xl border border-border bg-bg-card p-6 shadow-card sm:p-8 duration-200 hover:shadow-card-strong'>
        {children}
      </div>
    </section>
  );
}

import type { Skill } from '@/types/resume';
import Section from './Section';
import Image from 'next/image';

const SKILLS_DATA: Skill[] = [
  {
    label: '언어',
    items: [
      { name: 'HTML', svg: '/icons/HTML.svg' },
      { name: 'CSS', svg: '/icons/CSS.svg' },
      { name: 'JavaScript', svg: '/icons/JavaScript.svg' },
      { name: 'TypeScript', svg: '/icons/TypeScript.svg' },
      { name: 'Python', svg: '/icons/Python.svg' },
      { name: 'Java', svg: '/icons/Java.svg' },
    ],
  },
  {
    label: '프론트엔드',
    items: [
      { name: 'React', svg: '/icons/React.svg' },
      { name: 'Next.js', svg: '/icons/NextJS.svg' },
      { name: 'Tailwind CSS', svg: '/icons/TailwindCSS.svg' },
      { name: 'Zustand', svg: '/icons/Zustand.svg' },
      { name: 'Redux', svg: '/icons/Redux.svg' },
    ],
  },
  {
    label: '백엔드 & 인프라',
    items: [
      { name: 'FastAPI', svg: '/icons/FastAPI.svg' },
      { name: 'Spring Boot', svg: '/icons/SpringBoot.svg' },
      { name: 'Supabase', svg: '/icons/Supabase.svg' },
      { name: 'Ably', svg: '/icons/Ably.svg' },
      { name: 'AWS (EC2, S3)', svg: '/icons/AWS.svg' },
    ],
  },
  {
    label: '도구',
    items: [
      { name: 'Vite', svg: '/icons/Vite.svg' },
      { name: 'Figma', svg: '/icons/Figma.svg' },
      { name: 'Git', svg: '/icons/Git.svg' },
      { name: 'GitHub', svg: '/icons/GitHub.svg' },
    ],
  },
];

export default function Skills() {
  return (
    <Section title='기술 스택'>
      <dl className='divide-y divide-border'>
        {SKILLS_DATA.map((skill) => (
          <div
            key={skill.label}
            className='grid gap-2 py-4 first:pt-0 last:pb-0 sm:grid-cols-[8rem_1fr] sm:gap-4'
          >
            <dt className='text-md font-semibold text-muted pb-2 ml-2'>
              {skill.label}
            </dt>
            <dd>
              <ul className='flex flex-wrap gap-4'>
                {skill.items.map((item) => (
                  <li
                    key={item.name}
                    className='inline-flex items-center gap-2 rounded-full border border-border bg-bg px-3 py-1.5 text-sm text-sub'
                  >
                    <Image
                      src={item.svg}
                      alt={item.name}
                      width={24}
                      height={24}
                      loading='lazy'
                    />
                    {item.name}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

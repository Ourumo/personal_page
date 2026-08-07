import type { SkillGroup } from '@/types/resume';
import Section from './Section';
import Image from 'next/image';

const SKILLS: SkillGroup[] = [
  {
    label: '언어',
    items: [
      { name: 'HTML', src: '/icons/HTML.svg' },
      { name: 'CSS', src: '/icons/CSS.svg' },
      { name: 'JavaScript', src: '/icons/JavaScript.svg' },
      { name: 'TypeScript', src: '/icons/TypeScript.svg' },
      { name: 'Python', src: '/icons/Python.svg' },
      { name: 'Java', src: '/icons/Java.svg' },
    ],
  },
  {
    label: '프론트엔드',
    items: [
      { name: 'React', src: '/icons/React.svg' },
      { name: 'Next.js', src: '/icons/NextJS.svg' },
      { name: 'Tailwind CSS', src: '/icons/TailwindCSS.svg' },
      { name: 'Zustand', src: '/icons/Zustand.svg' },
      { name: 'Redux', src: '/icons/Redux.svg' },
    ],
  },
  {
    label: '백엔드 & 인프라',
    items: [
      { name: 'FastAPI', src: '/icons/FastAPI.svg' },
      { name: 'Spring Boot', src: '/icons/SpringBoot.svg' },
      { name: 'Supabase', src: '/icons/Supabase.svg' },
      { name: 'Ably', src: '/icons/Ably.svg' },
      { name: 'AWS (EC2, S3)', src: '/icons/AWS.svg' },
    ],
  },
  {
    label: '도구',
    items: [
      { name: 'Vite', src: '/icons/Vite.svg' },
      { name: 'Figma', src: '/icons/Figma.svg' },
      { name: 'Git', src: '/icons/Git.svg' },
      { name: 'GitHub', src: '/icons/GitHub.svg' },
    ],
  },
];

export default function Skills() {
  return (
    <Section title='기술 스택'>
      <dl className='divide-y divide-border'>
        {SKILLS.map((skill) => (
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
                      src={item.src}
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

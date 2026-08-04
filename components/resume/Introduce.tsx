import { IntroduceContent, IntroduceLink } from '@/types/resume';
import styles from './Introduce.module.css';
import IntroduceSpotlight from './IntroduceSpotlight';

const INTRODUCE_LINKS: IntroduceLink[] = [
  { label: 'GitHub', href: 'https://github.com/Ourumo', external: true },
  { label: '이메일', href: 'mailto:ss8638@naver.com', external: false },
];

const INTRODUCE_CONTENT: IntroduceContent = {
  role: 'Frontend Developer',
  name: '이규태',
  slogan: '복잡함은 구조로 나누고, 화면은 가볍게 만듭니다.',
  links: INTRODUCE_LINKS,
};

export default function Introduce() {
  return (
    <section
      className={`${styles.hero} flex min-h-[88svh] flex-col items-center justify-center px-6`}
    >
      <IntroduceSpotlight />

      <div className='relative flex flex-col items-center gap-4 text-center'>
        <p className='text-sm font-medium tracking-[0.2em] text-primary uppercase'>
          {INTRODUCE_CONTENT.role}
        </p>
        <h1 className='text-5xl font-bold text-main sm:text-6xl'>
          {INTRODUCE_CONTENT.name}
        </h1>
        <p className='max-w-md text-base text-sub sm:text-lg'>
          {INTRODUCE_CONTENT.slogan}
        </p>

        <ul className='mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2'>
          {INTRODUCE_CONTENT.links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                {...(link.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className='rounded-sm text-sm font-medium text-sub underline-offset-4 hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary'
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

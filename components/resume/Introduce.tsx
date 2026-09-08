import { CommonLink, IntroduceData } from '@/types/resume';
import styles from './Introduce.module.css';
import IntroduceSpotlight from './IntroduceSpotlight';

const INTRODUCE_LINKS: CommonLink[] = [
  { label: 'GitHub', href: 'https://github.com/Ourumo', external: true },
  { label: '이메일', href: 'mailto:ss8638@naver.com', external: false },
];

const INTRODUCE_DATA: IntroduceData = {
  role: 'Frontend Developer',
  name: '이규태',
  slogan: '복잡함은 구조로 나누고, 화면은 가볍게 만듭니다.',
  bio: '프론트엔드를 중심으로 API 서버와 배포까지 직접 다뤄 왔습니다. 실시간 협업 플랫폼, 사내 전자결재, 운동 추천 앱을 만들며 요구사항을 구조로 옮기는 일을 반복했습니다.',
  links: INTRODUCE_LINKS,
};

export default function Introduce() {
  return (
    <section
      className={`${styles.hero} flex min-h-[90svh] flex-col items-center justify-center px-6`}
    >
      <IntroduceSpotlight />

      <div className='relative flex flex-col items-center gap-4 text-center'>
        <p className='text-sm font-medium tracking-widest text-primary uppercase'>
          {INTRODUCE_DATA.role}
        </p>
        <h1 className='text-5xl font-bold text-main sm:text-6xl'>
          {INTRODUCE_DATA.name}
        </h1>
        <p className='max-w-md text-base font-medium text-sub sm:text-lg'>
          {INTRODUCE_DATA.slogan}
        </p>
        <p className='max-w-xl text-sm leading-relaxed text-muted sm:text-base'>
          {INTRODUCE_DATA.bio}
        </p>

        <ul className='mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2'>
          {INTRODUCE_DATA.links.map((link) => (
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

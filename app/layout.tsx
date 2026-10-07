import type { Metadata } from 'next';
import { Geist_Mono } from 'next/font/google';
/* Pretendard 를 글자 범위별 조각으로 나눈 CSS. 화면에 쓰인 글자가 든 조각만 받는다.
   글꼴 이름은 'Pretendard Variable' 이고 globals.css 의 --font-sans 가 가리킨다 */
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';
import './globals.css';

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '이규태 - 개인 페이지',
  description: '이규태의 개인 페이지입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='ko'
      className={`${geistMono.variable} h-full antialiased`}
    >
      <body className='min-h-full flex flex-col'>{children}</body>
    </html>
  );
}

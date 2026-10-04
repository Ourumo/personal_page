import type { Period } from '@/types/resume';

const split = (yymmdd: number) => {
  const text = String(yymmdd);

  return {
    year: text.slice(0, 2),
    month: text.slice(2, 4),
    day: text.slice(4, 6),
  };
};

/** 오늘을 저장 형식(YYMMDD)과 같은 꼴의 숫자로 만든다.
    꼴이 같으면 날짜 파싱 없이 숫자 비교만으로 앞뒤를 가릴 수 있다 */
const todayAsYymmdd = () => {
  const now = new Date();

  return (
    (now.getFullYear() % 100) * 10000 +
    (now.getMonth() + 1) * 100 +
    now.getDate()
  );
};

/** 끝나는 날이 아직 지나지 않았으면 진행 중 (끝나는 날 당일도 진행 중으로 본다) */
export const isOngoing = ({ end }: Period, today = todayAsYymmdd()) =>
  end >= today;

export const formatPeriod = ({ start, end }: Period) => {
  const from = split(start);
  const to = split(end);

  return `${from.year}.${from.month}.${from.day} ~ ${to.year}.${to.month}.${to.day}`;
};

/** { start: 160301, end: 230228 } → '2016.03 – 2023.02' (교육처럼 월까지만 보이면 될 때)
    아직 끝나지 않은 기간은 '2026.04 – 진행 중'
    인자를 하나만 받는다. Array.map 에 그대로 넘겨도 index 가 섞이지 않게 하기 위함 */
export const formatPeriodMonths = (period: Period) => {
  const from = split(period.start);
  const to = split(period.end);
  const start = `20${from.year}.${from.month}`;

  return isOngoing(period)
    ? `${start} – 진행 중`
    : `${start} – 20${to.year}.${to.month}`;
};

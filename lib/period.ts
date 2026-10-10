import type { Period } from '@/types/resume';

const split = (yymmdd: number) => {
  const text = String(yymmdd);

  return {
    year: text.slice(0, 2),
    month: text.slice(2, 4),
    day: text.slice(4, 6),
  };
};

export const formatPeriod = ({ start, end }: Period) => {
  const from = split(start);
  const to = split(end);

  return `${from.year}.${from.month}.${from.day} ~ ${to.year}.${to.month}.${to.day}`;
};

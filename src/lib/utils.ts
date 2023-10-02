import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDistanceToNowStrict } from 'date-fns';
import locale from 'date-fns/locale/ru';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const formatDistanceLocale = {
  lessThanXSeconds: 'сейчас',
  xSeconds: 'сейчас',
  halfAMinute: 'сейчас',
  lessThanXMinutes: '{{count}} минута',
  xMinutes: '{{count}} минуты',
  aboutXHours: '{{count}} часов',
  xHours: '{{count}} часа',
  xDays: '{{count}} дней',
  aboutXWeeks: '{{count}}недель',
  xWeeks: '{{count}}недель',
  aboutXMonths: '{{count}}месяцев',
  xMonths: '{{count}}месяцев',
  aboutXYears: '{{count}}y',
  xYears: '{{count}}y',
  overXYears: '{{count}}y',
  almostXYears: '{{count}}y',
};

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {};

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace('{{count}}', count.toString());

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'в ' + result;
    } else {
      if (result === 'сейчас') return result;
      return result + ' назад';
    }
  }

  return result;
}

export function formatTimeToNow(date: Date): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  });
}

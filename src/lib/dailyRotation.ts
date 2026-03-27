"use client";

import { useEffect, useState } from "react";

type Rotatable = {
  src: string;
  alt: string;
};

function getDayKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function hashString(value: string) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }

  return Math.abs(hash);
}

function getMillisecondsUntilTomorrow(date: Date) {
  const tomorrow = new Date(date);

  tomorrow.setHours(24, 0, 0, 0);

  return tomorrow.getTime() - date.getTime();
}

export function useDailyRotationKey() {
  const [dayKey, setDayKey] = useState(() => getDayKey(new Date()));

  useEffect(() => {
    let intervalId: number | undefined;

    const syncDayKey = () => {
      setDayKey(getDayKey(new Date()));
    };

    const now = new Date();
    const timeoutId = window.setTimeout(() => {
      syncDayKey();
      intervalId = window.setInterval(syncDayKey, 24 * 60 * 60 * 1000);
    }, getMillisecondsUntilTomorrow(now));

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
      }
    };
  }, []);

  return dayKey;
}

export function pickDailyVariant<T extends Rotatable>(
  items: T[],
  dayKey: string,
  salt: string,
) {
  const rotationIndex = hashString(`${dayKey}:${salt}`) % items.length;

  return items[rotationIndex];
}

"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

function normalizeDayOverride(dayOverride: string | null) {
  const trimmedValue = dayOverride?.trim();

  if (!trimmedValue) {
    return null;
  }

  if (!/^\d{4}-\d{1,2}-\d{1,2}$/.test(trimmedValue)) {
    return null;
  }

  const [year, month, day] = trimmedValue.split("-").map(Number);

  return `${year}-${month}-${day}`;
}

export function useDailyRotationKey() {
  const searchParams = useSearchParams();
  const dayOverride = normalizeDayOverride(searchParams.get("day"));
  const [dayKey, setDayKey] = useState(() => {
    return dayOverride ?? getDayKey(new Date());
  });

  useEffect(() => {
    if (dayOverride) {
      setDayKey(dayOverride);
      return;
    }

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
  }, [dayOverride]);

  return dayKey;
}

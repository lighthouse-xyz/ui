import { format } from "fecha";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface FormatDateOptions {
  includeTime?: boolean;
  allDay?: boolean;
  includeYear?: boolean;
}

interface DateUtilities {
  formatDate: (date: Date, stringFormat: string) => string;
  formatDates: (dates: { nextStartAt: Date; nextFinishAt?: Date }, options?: FormatDateOptions) => string;
  getDaysFromNow: (date: Date) => number;
  isToday: (date: Date) => boolean;
  isYesterday: (date: Date) => boolean;
}

function useDate(): DateUtilities {
  const shortDateFormat = "MMM Do";
  const dateFormat = "MMMM Do";
  const dateFormatWithYear = "MMMM Do YYYY";
  const timeFormat = "h:mmA";
  const timeFormatWithoutMinutes = "hA";

  const { t } = useTranslation();

  const [now] = useState(new Date());

  const getDaysFromNow = (date: Date): number => {
    try {
      // eslint-disable-next-line no-magic-numbers
      const oneDay = 1000 * 60 * 60 * 24;
      const diffInTime = new Date(now.getTime()).setHours(0, 0, 0, 0) - new Date(date.getTime()).setHours(0, 0, 0, 0);

      return Math.ceil(diffInTime / oneDay);
    } catch (e) {
      return Number.MAX_VALUE;
    }
  };

  const sameDay = (start: Date, end: Date): boolean => {
    try {
      return (
        start.getDate() === end.getDate() &&
        start.getMonth() === end.getMonth() &&
        start.getFullYear() === end.getFullYear()
      );
    } catch (e) {
      return false;
    }
  };

  const isToday = (date: Date): boolean => {
    try {
      return (
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    } catch (e) {
      return false;
    }
  };

  const isTomorrow = (date: Date): boolean => {
    try {
      return (
        date.getDate() === now.getDate() + 1 &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    } catch (e) {
      return false;
    }
  };

  const isYesterday = (date: Date): boolean => {
    try {
      return (
        date.getDate() === now.getDate() - 1 &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    } catch (e) {
      return false;
    }
  };

  const formatDate = (date: Date, stringFormat: string): string => {
    let formattedDate = "";
    if (isToday(date)) {
      formattedDate = t("time.today");
    } else if (isYesterday(date)) {
      formattedDate = t("time.yesterday");
    } else if (isTomorrow(date)) {
      formattedDate = t("time.tomorrow");
    } else {
      formattedDate = format(date, stringFormat);
    }

    return formattedDate;
  };

  const formatDates = (dates: { nextStartAt: Date; nextFinishAt?: Date }, options?: FormatDateOptions): string => {
    const { nextStartAt, nextFinishAt } = dates;

    try {
      const dateFormatSelected = options?.includeYear
        ? dateFormatWithYear
        : options?.includeTime
        ? shortDateFormat
        : dateFormat;
      const dateStartAtFormatted = formatDate(nextStartAt, dateFormatSelected);
      const dateFinishAtFormatted = nextFinishAt ? formatDate(nextFinishAt, dateFormatSelected) : "";

      const timeStartAtFormatted = format(
        nextStartAt,
        nextStartAt.getMinutes() === 0 ? timeFormatWithoutMinutes : timeFormat,
      );
      const timeFinishAtFormatted = nextFinishAt
        ? format(nextFinishAt, nextFinishAt.getMinutes() === 0 ? timeFormatWithoutMinutes : timeFormat)
        : "";

      if (nextFinishAt && !sameDay(nextStartAt, nextFinishAt) && !options?.allDay) {
        return `${dateStartAtFormatted}, ${timeStartAtFormatted} - ${dateFinishAtFormatted}, ${timeFinishAtFormatted}`;
      }

      const time = !options?.allDay
        ? `${timeStartAtFormatted}${nextFinishAt ? " - " : ""}${nextFinishAt ? timeFinishAtFormatted : ""}`
        : t("time.allDay");
      const atTime = `${options?.allDay || nextFinishAt ? "," : " at"} ${time}`;

      return `${dateStartAtFormatted}${options?.includeTime ? atTime : ""}`;
    } catch (e) {
      return "No specified date";
    }
  };

  return {
    getDaysFromNow,
    isToday,
    isYesterday,
    formatDate,
    formatDates,
  };
}

export default useDate;

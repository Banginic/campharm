import { useMemo } from "react";
import moment from "moment";


export type DayName =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

interface DaySchedule {
  open?: string | Date;
  close?: string | Date;
  isOnCall?: boolean;
}

 type WeeklyScheduleType = Record<DayName, DaySchedule>;

export function usePharmacyStatus(weeklySchedule: WeeklyScheduleType ) {
  return useMemo(() => {
    if (!weeklySchedule) {
      return {
        isOpen: false,
        closingIn: null,
        openingTime: "N/A",
        closingTime: "N/A",
        isOnCall: false,
      };
    }

 const weekDays: { name: DayName; index: number }[] = [
  { name: "sunday", index: 0 },
  { name: "monday", index: 1 },
  { name: "tuesday", index: 2 },
  { name: "wednesday", index: 3 },
  { name: "thursday", index: 4 },
  { name: "friday", index: 5 },
  { name: "saturday", index: 6 },
];
    

    const todayIndex = new Date().getDay();
    const today = weekDays.find((d) => d.index === todayIndex);
    const todaySchedule = today ? weeklySchedule[today.name]  : undefined;

    if (!todaySchedule?.open || !todaySchedule?.close) {
      return {
        isOpen: false,
        closingIn: null,
        openingTime: "N/A",
        closingTime: "N/A",
        isOnCall: todaySchedule?.isOnCall ?? false,
      };
    }

    const now = moment();
    const start = moment(todaySchedule.open, "HH:mm");
    const end = moment(todaySchedule.close, "HH:mm");

    let isOpen = false;

    // Handle case where closing time is past midnight
    if (end.isBefore(start)) {
      isOpen = now.isAfter(start) || now.isBefore(end);
    } else {
      isOpen = now.isBetween(start, end);
    }

    // Calculate closing time remaining
    let closingIn: string | null = null;
    if (isOpen) {
      let remainingMinutes;

      if (end.isBefore(start)) {
        // Past midnight case
        if (now.isBefore(end)) {
          remainingMinutes = end.diff(now, "minutes");
        } else {
          const midnight = moment("23:59", "HH:mm");
          remainingMinutes = midnight.diff(now, "minutes") + end.diff(moment("00:00", "HH:mm"), "minutes");
        }
      } else {
        remainingMinutes = end.diff(now, "minutes");
      }

      const remainingHours = Math.floor(remainingMinutes / 60);
      const remainingMins = remainingMinutes % 60;

      if (remainingHours < 4) {
        closingIn = remainingHours > 0
          ? `Closing in ${remainingHours}h ${remainingMins}m`
          : `Closing in ${remainingMins}m`;
      }
    }

    return {
      isOpen,
      closingIn,
      openingTime: todaySchedule.open,
      closingTime: todaySchedule.close,
      isOnCall: todaySchedule.isOnCall ?? false,
    };
  }, [weeklySchedule]);
}

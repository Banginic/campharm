import { useMemo } from "react";
import moment from "moment";
import { isPharmacyOpen } from "@/libs/isPharmayOpen";

interface PharmacyDailySchedule {
  pharmacyId: number;
  pharmacyName: string;
  closingTime: string; // e.g. "18:00"
  openingTime: string; // e.g. "08:00"
  isOnCall: boolean;
  isOpen: boolean; // API-provided
  day: string;     // e.g. "monday"
}

export type DayName =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export function usePharmacyStatusSingle(pharmacy: PharmacyDailySchedule) {
  return useMemo(() => {
    // No valid times
    if (!pharmacy.openingTime || !pharmacy.closingTime) {
      return {
        status: "Closed",
        timeInfo: null,
        isOnCall: false,
      };
    }
const ApiIsOpen =  isPharmacyOpen(pharmacy.openingTime, pharmacy.closingTime, pharmacy.isOnCall)
    const todayIndex = new Date().getDay();
    const currentDay: DayName = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ][todayIndex] as DayName;

    // If not today's schedule, default closed unless onCall
    if (pharmacy.day.toLowerCase() !== currentDay) {
      return {
        isOpen: ApiIsOpen,
        status: pharmacy.isOnCall ? "Open (On Call)" : "Closed",
        timeInfo: null,
        isOnCall: pharmacy.isOnCall,
      };
    }

    const now = moment();
    const start = moment(pharmacy.openingTime, "HH:mm");
    const end = moment(pharmacy.closingTime, "HH:mm");

    let isOpen: boolean;

    // Priority 1: On call always open
    if (pharmacy.isOnCall) {
      isOpen = true;
    } else if (ApiIsOpen !== undefined) {
      // API override
      isOpen = ApiIsOpen;
    } else {
      // Calculate open/close
      if (end.isBefore(start)) {
        // Overnight schedule
        isOpen = now.isAfter(start) || now.isBefore(end);
      } else {
        isOpen = now.isBetween(start, end);
      }
    }

    let status: string;
    let timeInfo: string | null = null;

    if (isOpen) {
      status = "Open";

      // Calculate time until closing
      let minutesToClose: number;
      if (end.isBefore(start)) {
        // Overnight case
        if (now.isBefore(end)) {
          minutesToClose = end.diff(now, "minutes");
        } else {
          const midnight = moment("23:59", "HH:mm");
          minutesToClose =
            midnight.diff(now, "minutes") +
            end.diff(moment("00:00", "HH:mm"), "minutes");
        }
      } else {
        minutesToClose = end.diff(now, "minutes");
      }

      const hours = Math.floor(minutesToClose / 60);
      const mins = minutesToClose % 60;
      timeInfo =
        hours > 0 ? `Closing in ${hours}h ${mins}m` : `Closing in ${mins}m`;
    } else {
      // Closed — calculate time until opening
      status = "Closed";

      let minutesToOpen: number;
      if (end.isBefore(start)) {
        // Overnight — if before opening, open later today
        minutesToOpen = start.diff(now, "minutes");
        if (minutesToOpen < 0) {
          minutesToOpen += 24 * 60; // wrap to next day
        }
      } else {
        minutesToOpen = start.diff(now, "minutes");
      }

      if (minutesToOpen > 0) {
        const hours = Math.floor(minutesToOpen / 60);
        const mins = minutesToOpen % 60;
        timeInfo =
          hours > 0
            ? `Opening in ${hours}h ${mins}m`
            : `Opening in ${mins}m`;
      }
    }

    return {
      status: pharmacy.isOnCall ? "Open (On Call)" : status,
      timeInfo,
      isOnCall: pharmacy.isOnCall,
    };
  }, [
    pharmacy.openingTime,
    pharmacy.closingTime,
    pharmacy.isOnCall,
    pharmacy.isOpen,
    pharmacy.day,
  ]);
}

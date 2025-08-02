import { daysOfWeek } from "@/assets/data";
import { WeeklyScheduleType } from "@/models/types";

function WeekDays({
  weeklySchedule,
  isOnCall,
}: {
  weeklySchedule: WeeklyScheduleType;
  isOnCall: boolean;
}) {
  const openingTime = "07:30";
  const closingTime = "19:30";
  const onCallDays = [0, 4];
  const today = new Date();
  const calendar = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dayIndex = date.getDay();

    // Convert JS getDay (0–6, Sun–Sat) to 1–7 (Mon–Sun)
    let jsDay = date.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
    let weekDayIndex = jsDay === 0 ? 6 : jsDay - 1; // Shift so Mon=0, Sun=6

    const formattedDate = date.toLocaleDateString("en-GB", {
      month: "long",
      day: "numeric",
      timeZone: "Africa/Douala",
    });
    calendar.push({
      day: daysOfWeek[weekDayIndex],
      date: formattedDate,
      openingTime,
      closingTime,
      onCall: onCallDays.includes(jsDay), // match original JS day number for on-call logic
    });
  }
  const weekArray = Object.entries(weeklySchedule).map(([day, times]) => ({
    day,
    ...times,
  }));

  return (
    <section className="w-sm border mt-8  liquid-glass mx-auto rounded p-4 shadow">
      {calendar.map((day) => (
        <div className="grid grid-cols-3 text-sm my-1.5 liquid-glass-effect px-4 h-14 rounded justify-between items-center border-gray-50">
          <p>{day.date}</p>
          <p>{day.day}</p>
          <div>
            {day.day !== "Sunday" ? (
              <div>
                <p className="flex text-xs lg:text-sm gap-2">
                  <span className="text-gray-600 w-14">Opening:</span>
                  <span>
                    {weekArray &&
                      weekArray.map((item) => {
                        if (item.day === day.day.toLowerCase()) {
                          return item.open;
                        }
                      })}
                  </span>
                </p>
                <p className="flex text-xs lg:text-sm gap-2">
                  <span className="text-gray-600 w-14">Closing:</span>
                  <span>
                    {weekArray &&
                      weekArray.map((item) => {
                        if (item.day === day.day.toLowerCase()) {
                          return item.close;
                        }
                      })}
                  </span>
                </p>
              </div>
            ) : (
              <p className="text-red-500">Closed</p>
            )}
          </div>
          <p className={` text-sm lg:text-[16px] text-green-500`}>
            {" "}
            {weekArray &&
              weekArray.map((item) => {
                if (item.day === day.day.toLowerCase() && item.isOnCall) {
                  return "On Call";
                }
              })}
          </p>
        </div>
      ))}
    </section>
  );
}

export default WeekDays;

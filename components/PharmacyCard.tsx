import Link from "next/link";
import { PharmacyType } from "@/models/types";

function PharmacyCard({ pharmacy }: { pharmacy: PharmacyType }) {
  const weekDays = [
    { name: "monday", index: 1 },
    { name: "tuesday", index: 2 },
    { name: "wednesday", index: 3 },
    { name: "thursday", index: 4 },
    { name: "friday", index: 5 },
    { name: "saturday", index: 6 },
    { name: "sunday", index: 7 },
  ];
  const today = new Date().getDay();
  const weekArray = Object.entries(pharmacy.weeklySchedule ?? {}).map(
    ([day, times]) => ({
      day,
      ...times,
    })
  );
  function openingTime() {
    const today = weekDays.find((day) => day.index === new Date().getDay());
    const storedDay = weekArray.find((item) => item.day === today?.name);
    return storedDay.open;
  }
  function closingTime() {
    const today = weekDays.find((day) => day.index === new Date().getDay());
    const storedDay = weekArray.find((item) => item.day === today?.name);
    return storedDay.close;
  }
  function isOnCall() {
    const today = weekDays.find((day) => day.index === new Date().getDay());
    const storedDay = weekArray.find((item) => item.day === today?.name);
    return storedDay.isOnCall;
  }

  return (
    <Link
      href={`/pharmacies/${pharmacy.id}`}
      className="border border-white/30 bg-white/20 backdrop:blur-2xl rounded-xl cursor-pointer hover:bg-white/30 trans p-4 flex my-2 justify-between gap-4 items-center flex-nowrap w-sm lg:w-lg mx-auto shadow-md"
    >
      <div>
        {pharmacy.isOpen ? (
          <p className="size-3 rounded-full bg-green-500"></p>
        ) : (
          <p className="size-3 rounded-full bg-gray-500"></p>
        )}
      </div>
      <p className="font-semibold lg:text-lg text-nowrap flex-1">
        {pharmacy.pharmacyName}
      </p>
      <div className="flex-1">
        <p className="flex text-xs lg:text-sm gap-2">
          <span className="text-gray-600 w-14">Opening:</span>
          <span>{openingTime()}</span>
        </p>
        <p className="flex text-xs lg:text-sm gap-2">
          <span className="text-gray-600 w-14">Closing:</span>
          <span className="">{closingTime()}</span>
        </p>
      </div>
      <div>
        {isOnCall() ? (
          <p className="text-sm lg:text-[16px] text-green-500">Oncall</p>
        ) : (
          <div></div>
        )}
      </div>
    </Link>
  );
}

export default PharmacyCard;

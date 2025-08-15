import Link from "next/link";
import { usePharmacyStatusSingle } from "@/hooks/usesPharmacyStatus";

interface PharmacyDailySchedule {
  pharmacyId: number;
  pharmacyName: string;
  closingTime: string;
  openingTime: string;
  isOnCall: boolean;
  isOpen: boolean;
  day: string;
}
function PharmacyCard({ pharmacy }: { pharmacy: PharmacyDailySchedule }) {
  // ✅ Get dynamic status from hook
  const { status, timeInfo, isOnCall } = usePharmacyStatusSingle(pharmacy);

  return (
    <Link
      href={`/pharmacies/${pharmacy.pharmacyId}`}
      className="border  backdrop:blur-2xl rounded-xl cursor-pointer hover:bg-white/30  border-neutral-200 transition px-4 py-5 flex my-2  justify-between gap-4 items-center bg-white flex-nowrap w-[95%] max-w-xl mx-auto shadow-md"
    >
      {/* Open status indicator */}
      <div>
        {status !== "Closed" ? (
          <p className="size-3 rounded-full bg-green-500"></p>
        ) : (
          <p className="size-3 rounded-full bg-gray-500"></p>
        )}
      </div>

      {/* Pharmacy Name */}
      <p className="font-semibold lg:text-lg text-nowrap flex-1">
        {pharmacy.pharmacyName ?? "Unnamed Pharmacy"}
      </p>

      {/* Opening & Closing Info */}
      <div className="flex-1">
        {status !== "Closed" && !isOnCall ? (
          <div>
            <p className="text-green-500 text-xs">Open Now</p>
            <p className="text-xs text-yellow-600 ">{timeInfo}</p>
          </div>
        ) : isOnCall && status !== "Closed" ? (
          <p className="text-green-500 text-xs">Open Now</p>
        ) : (
          <div>
            <p className="flex text-xs flex-col lg:text-[16px] gap-">
              <span className={`${status !=='Close' ? 'text-red-400 w-14' : 'text-green-500'} font-semibold `}>{status}</span>
              <span className=" text-yellow-600">{timeInfo}</span>
            </p>
          </div>
        )}
      </div>

      {/* On-call badge */}
      {isOnCall && (
        <div>
          <p className="text-sm lg:text-[16px] text-green-500">On call</p>
        </div>
      )}
    </Link>
  );
}

export default PharmacyCard;

import Link from "next/link";
import { PharmacyType } from "@/models/types";
import { usePharmacyStatus } from "@/hooks/usesPharmacyStatus";

function PharmacyCard({ pharmacy }: { pharmacy: PharmacyType }) {
  // ✅ Get dynamic status from hook
  const { isOpen, closingIn, openingTime, closingTime, isOnCall } =
    usePharmacyStatus(pharmacy.weeklySchedule);

  return (
    <Link
      href={`/pharmacies/${pharmacy.id}`}
      className="border border-white/30 bg-white/20 backdrop:blur-2xl rounded-xl cursor-pointer hover:bg-white/30 transition p-4 flex my-2 justify-between gap-4 items-center flex-nowrap w-sm lg:w-lg mx-auto shadow-md"
    >
      {/* Open status indicator */}
      <div>
        {isOpen ? (
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
        {isOpen ? (
          <div>
            <p className="text-green-500 text-xs">Open Now</p>
            <p className="text-xs text-yellow-600 ">{closingIn}</p>
          </div>
        ) : isOnCall && isOpen ? (
          <p className="text-green-500 text-xs">Open Now</p>
        ) : (
          <div>
            <p className="flex text-xs lg:text-sm gap-2">
              <span className="text-gray-600 w-14">Opening:</span>
              <span>
                {typeof openingTime === "string"
                  ? openingTime
                  : new Date(openingTime).toLocaleTimeString("en-GB")}
              </span>
            </p>
            <div className="flex text-xs lg:text-sm gap-2">
              {!closingTime ? (
                <p>Closed</p>
              ) : (
                <div className="flex text-xs lg:text-sm gap-2">
                  <span className="text-gray-600 w-14">Closing:</span>
                  <span>
                    {typeof closingTime === "string"
                      ? closingTime
                      : new Date(closingTime).toLocaleTimeString("en-GB")}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* On-call badge */}
      {pharmacy.isOnCall && (
        <div>
          <p className="text-sm lg:text-[16px] text-green-500">Oncall</p>
        </div>
      )}
    </Link>
  );
}

export default PharmacyCard;

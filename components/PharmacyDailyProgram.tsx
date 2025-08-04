import React from "react";

const pharmacy = {
  isOpen: true,
  pharmacyName: "Mercy Pharmacy",
  isOnCall: true,
  closingIn: "Closing in 1h 35m",
  openingTime: "09:00",
  closingTime: "09:00",
};

function PharmacyDailyProgram() {
  return (
    <div className="border border-white/30 bg-white/20 backdrop:blur-2xl rounded-xl cursor-pointer hover:bg-white/30 transition p-4  shadow-md">
      <h1 className=" text-neutral-600 mb-2">Today's Program</h1>
      <hr className="border-neutral-300" />
      {/* Open status indicator */}
      <div className="flex my-2 justify-between gap-4 items-center flex-nowrap">
        <div>
          {pharmacy.isOpen ? (
            <p className="size-3 rounded-full bg-green-500"></p>
          ) : (
            <p className="size-3 rounded-full bg-gray-500"></p>
          )}
        </div>

        {/* Pharmacy Name */}
        <p className="font-semibold lg:text-lg text-nowrap flex-1 text-neutral-700">
          {pharmacy.pharmacyName ?? "Unnamed Pharmacy"}
        </p>

        {/* Opening & Closing Info */}
        <div className="flex-1">
          {pharmacy.isOpen ? (
            <div>
              <p className="text-green-500 text-xs">Open Now</p>
              <p className="text-xs text-yellow-600 ">{pharmacy.closingIn}</p>
            </div>
          ) : pharmacy.isOnCall && pharmacy.isOpen ? (
            <p className="text-green-500 text-xs">Open Now</p>
          ) : (
            <div>
              <p className="flex text-xs lg:text-sm gap-2">
                <span className="text-gray-600 w-14">Opening:</span>
                <span>
                  {typeof pharmacy.openingTime === "string"
                    ? pharmacy.openingTime
                    : new Date(pharmacy.openingTime).toLocaleTimeString(
                        "en-GB"
                      )}
                </span>
              </p>
              <div className="flex text-xs lg:text-sm gap-2">
                {!pharmacy.closingTime ? (
                  <p>Closed</p>
                ) : (
                  <div className="flex text-xs lg:text-sm gap-2">
                    <span className="text-gray-600 w-14">Closing:</span>
                    <span>
                      {typeof pharmacy.closingTime === "string"
                        ? pharmacy.closingTime
                        : new Date(pharmacy.closingTime).toLocaleTimeString(
                            "en-GB"
                          )}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* On-call badge */}
      {pharmacy.isOnCall && (
        <div>
          <p className="text-sm lg:text-[16px] text-green-500">Oncall</p>
        </div>
      )}
    </div>
  );
}

export default PharmacyDailyProgram;

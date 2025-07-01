import Link from "next/link";
import { PHARMACIES } from "@/assets/data";
import { PharmacyType } from "@/models/types";

function PharmacyCard({ pharmacy }: { pharmacy: PharmacyType }) {
  return (
    <Link
      href={`/pharmacies/${pharmacy.id}`}
      className="border border-gray-200 rounded  cursor-pointer hover:bg-gray-200 p-4 flex my-2 justify-between gap-4 items-center flex-nowrap w-sm lg:w-lg mx-auto bg-gray-300/20 backdrop:blur-md shadow-md"
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
          <span>07:45</span>
        </p>
        <p className="flex text-xs lg:text-sm gap-2">
          <span className="text-gray-600 w-14">Closing:</span>
          <span className="">19:45</span>
        </p>
      </div>
      <div>
        {pharmacy.isOnCall ? (
          <p className="text-sm lg:text-[16px] text-green-500">Oncall</p>
        ) : (
          <div></div>
        )}
      </div>
    </Link>
  );
}

export default PharmacyCard;

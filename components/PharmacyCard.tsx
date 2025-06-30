import { PHARMACIES } from "@/assets/data";

function PharmacyCard() {
  return (
    <div className="border border-gray-200 rounded my-2 cursor-pointer hover:bg-gray-200 p-4 flex mt-8 justify-between gap-4 items-center flex-nowrap w-sm lg:w-lg mx-auto bg-gray-300/20 backdrop:blur-md shadow-md">
      <div className="size-3 rounded-full bg-green-500"></div>
      <p className="font-semibold lg:text-lg text-nowrap">Karen Pharmacy</p>
      <div>
        <p className="flex text-xs lg:text-sm gap-2">
          <span className="text-gray-600 w-14">Opening:</span>
          <span>07:45</span>
        </p>
        <p className="flex text-xs lg:text-sm gap-2">
          <span className="text-gray-600 w-14">Closing:</span>
          <span className="">19:45</span>
        </p>
      </div>
      <p className="text-sm lg:text-[16px] text-green-500">Oncall</p>
    </div>
  );
}

export default PharmacyCard;

import Link from "next/link";

function page() {
  return (
    <div className="grid place-items-center liquid-glass-effect border shadow-sm border-gray-300 rounded w-sm mx-auto h-100 bg-gray-300/20 backdrop:blur-lg">
      <div className="w-[80%]">
        <Link href={"/select-location"}>
          <button className="bg-black text-white w-full  cursor-pointer hover:scale-x-105 trans rounded py-2.5 font-semibold">
            Pharmacy / Drug
          </button>
        </Link>
        <Link href={"/pharmacy"}>
          <button className="border-2 mt-4 w-full liquid-glass-effect rounded cursor-pointer hover:scale-x-105 py-2 trans font-semibold">
            Login / Create Pharmacy Account
          </button>
        </Link>
      </div>
    </div>
  );
}

export default page;

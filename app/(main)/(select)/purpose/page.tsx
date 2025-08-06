import Link from "next/link";

function page() {
  return (
   <section className="py-8">
     <div className="liquid-glass w-sm mx-auto p-2">
      <div className="grid place-items-center liquid-glass-effect border shadow-sm border-gray-300 rounded-xl h-100 bg-gray-300/20 backdrop:blur-lg">
        <div className="">
          <p className="text-neutral-600 mb-1 ">
            Searching for a Pharmacy or Medicine?
          </p>
          <Link href={"/select-location"}>
            <button className="bg-black text-white w-full  cursor-pointer lg:hover:scale-x-105 trans rounded-lg py-2 font-semibold">
              Pharmacy / Drug
            </button>
          </Link>
          <div className="flex gap-1 items-center mt-4">
            <hr className="border-green-950/60 w-1/2" />
            <span className="text-sm">Or</span>
            <hr className="border-green-950/60 w-1/2" />
          </div>
          <p className="mt-4 text-neutral-600 mb-1">Own a Pharmacy?</p>
          <Link href={"/pharmacy"}>
            <button className="border-2  w-full liquid-glass-effect rounded-lg cursor-pointer lg:hover:scale-x-105 py-2 trans font-medium">
              Login / Create Pharmacy Account
            </button>
          </Link>
        </div>
      </div>
    </div>
   </section>
  );
}

export default page;

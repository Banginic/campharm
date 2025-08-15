import { Title } from "@/components";
import React from "react";

function page() {
  return (
    <div className="min-h-screen placeholder-yellow-800">
      <Title text="Pharmacy Details" />
      <div className="flex flex-col  lg:flex-row mt-8">
        {/* Left side */}
        <div className="border border-gray-200/80 p-4 bg-gray-200/50 w-[95%] max-w-lg mx-auto ">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <p className="size-4 rounded-full animate-pulse bg-gray-300"></p>
              <p className="h-4 w-20 bg-gray-300 animate-pulse"></p>
            </div>
            <p className="h-2 w-10 bg-gray-300"></p>
          </div>
          <div className="flex items-center gap-2 mt-8 animate-pulse">
            <p className="size-5 rounded-lg bg-gray-300"></p>
            <p className="h-3 w-20 bg-gray-300"></p>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <p className="size-5 rounded-lg animate-pulse bg-gray-300"></p>
            <p className="h-3 w-28 bg-gray-300 animate-pulse"></p>
          </div>
          <div className="flex items-center gap-2 mt-2 animate-pulse">
            <p className="size-5 rounded-lg bg-gray-300"></p>
            <p className="h-3 w-32 bg-gray-300"></p>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <p className="size-5 rounded-lg bg-gray-300 animate-pulse"></p>
            <p className="h-3 w-18 bg-gray-300 animate-pulse"></p>
          </div>
          <div className="flex items-center gap-2 mt-2 animate-pulse">
            <p className="size-5 rounded-lg bg-gray-300"></p>
            <p className="h-3 w-24 bg-gray-300"></p>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <p className="size-5 rounded-lg bg-gray-300 animate-pulse"></p>
            <p className="h-3 w-14 bg-gray-300 animate-pulse"></p>
          </div>
          <div className="flex items-center justify-center gap-2 mt-4">
            <p className="h-8 w-35 rounded-lg bg-gray-300 animate-pulse"></p>
            <p className="h-8 w-35 rounded-lg bg-gray-300 animate-pulse"></p>
          </div>
        </div>

        {/* Right side */}
        <div className="border border-gray-200/80 p-4 bg-gray-200/50 w-[95%] max-w-lg mx-auto ">
          <div className="flex items-center justify-between gap-2  animate-pulse">
            <p className="h-4 w-26  bg-gray-300"></p>
            <p className="h-3 w-20 bg-gray-300"></p>
          </div>
          <div className="flex items-center justify-around gap-2 bg-gray-300 h-10 rounded-lg mt-4 mb-2 animate-pulse">
            <p className="h-4 w-26  bg-gray-400/40"></p>
            <p className="h-3 w-16 bg-gray-400/40"></p>
            <p className="h-3 w-16 bg-gray-400/40"></p>
          </div>
          <div className=" bg-gray-300 h-20 rounded-lg mt-6 mb-2 animate-pulse">
            <div className="flex items-center gap-4 pt-2">
              <p className="size-4 rounded-full ml-4 bg-gray-400/40"></p>
              <p className="h-3 w-32 bg-gray-400/40"></p>
            </div>
            <p className="h-3 w-3/4 ml-2 mt-4 bg-gray-400/40"></p>
            <p className="h-3 w-4/5 ml-2 mt-1 bg-gray-400/40"></p>
          </div>
          <div className=" bg-gray-300 h-52 rounded-lg mt-6 mb-2 animate-pulse">
            <div className="flex items-center gap-4 pt-2">
              <p className="h-3 w-32 bg-gray-400/40 ml-2 mt-2"></p>
            </div>
            <div className="flex items-center gap-2 mt-8 animate-pulse ml-2">
              <p className="size-5 rounded-lg bg-gray-400"></p>
              <p className="h-3 w-20 bg-gray-400"></p>
              <p className="h-6 w-25 ml-5 bg-gray-400"></p>
            </div>
            <div className="flex items-center gap-2 mt-2 animate-pulse ml-2">
              <p className="size-5 rounded-lg bg-gray-400"></p>
              <p className="h-3 w-16 bg-gray-400"></p>
              <p className="h-6 w-20 ml-5 bg-gray-400"></p>
            </div>
            <div className="flex items-center gap-2 mt-2 animate-pulse ml-2">
              <p className="size-5 rounded-lg bg-gray-400"></p>
              <p className="h-3 w-12 bg-gray-400"></p>
              <p className="h-6 w-20 ml-5 bg-gray-400"></p>
            </div>
            <div className="flex items-center gap-2 mt-2 animate-pulse ml-2">
              <p className="size-5 rounded-lg bg-gray-400"></p>
              <p className="h-3 w-20 bg-gray-400"></p>
              <p className="h-6 w-20 ml-5 bg-gray-400"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;

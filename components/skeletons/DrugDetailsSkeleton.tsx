import { Title } from "@/components";
import React from "react";

function DrugDetailsSkeleton() {
  return (
    <div className="min-h-screen placeholder-yellow-800">
      <Title text="Drug Details" />
      <div className=" mt-8">
        {/* Left side */}
        <div className="border rounded-xl border-gray-200/80 p-6 bg-gray-200/50 w-[95%] max-w-xl mx-auto ">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <p className="size-4 rounded-full animate-pulse bg-gray-300"></p>
              <p className="h-4 w-20 bg-gray-300 animate-pulse"></p>
            </div>
            <p className="h-2 w-10 bg-gray-300"></p>
          </div>
          <div className="grid  grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-1">
            <div className=" mt-8 animate-pulse">
              <p className="h-2 w-14 rounded-lg bg-gray-300"></p>
              <p className="h-3 w-20 mt-1 bg-gray-300"></p>
            </div>{" "}
            <div className=" mt-8 animate-pulse">
              <p className="h-2 w-14 rounded-lg bg-gray-300"></p>
              <p className="h-3 w-20 mt-1 bg-gray-300"></p>
            </div>{" "}
            <div className=" mt-8 animate-pulse">
              <p className="h-2 w-14 rounded-lg bg-gray-300"></p>
              <p className="h-3 w-20 mt-1 bg-gray-300"></p>
            </div>{" "}
            <div className=" mt-8 animate-pulse">
              <p className="h-2 w-14 rounded-lg bg-gray-300"></p>
              <p className="h-3 w-20 mt-1 bg-gray-300"></p>
            </div>{" "}
            <div className=" mt-8 animate-pulse">
              <p className="h-2 w-14 rounded-lg bg-gray-300"></p>
              <p className="h-3 w-20 mt-1 bg-gray-300"></p>
            </div>
          </div>
          <div className=" mt-8 animate-pulse">
            <p className="h-2 w-14 rounded-lg bg-gray-300"></p>
            <p className="h-14 w-full mt-1 bg-gray-300"></p>
          </div>
          <div className=" mt-8 animate-pulse">
            <p className="h-2 w-14 rounded-lg bg-gray-300"></p>
            <p className="h-4 w-32 mt-1 bg-gray-300"></p>
            <div className="mt-4 flex gap-2">
              <p className="h-4 w-6 bg-gray-300"></p>
              <p className="h-4 w-6 bg-gray-300"></p>
              <p className="h-4 w-6 bg-gray-300"></p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
              <p className="size-4 rounded-full animate-pulse bg-gray-300"></p>
              <p className="h-4 w-18 bg-gray-300 animate-pulse"></p>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <p className="size-4 rounded-full animate-pulse bg-gray-300"></p>
              <p className="h-4 w-20 bg-gray-300 animate-pulse"></p>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <p className="size-4 rounded-full animate-pulse bg-gray-300"></p>
              <p className="h-4 w-12 bg-gray-300 animate-pulse"></p>
            </div>
          <div className="flex items-center  gap-2 my-4">
            <p className="h-8 w-35 rounded-lg bg-gray-300 animate-pulse"></p>
            <p className="h-8 w-35 rounded-lg bg-gray-300 animate-pulse"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DrugDetailsSkeleton;

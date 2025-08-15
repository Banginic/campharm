import React from "react";


function PharmacySkeleton() {
  const myArray = [1, 2, 3, 4, 5];
  return (
    <div className="flex flex-col gap-2 mt-10 ">
      {myArray.map((_, index) => {
        return (
          <div
            key={index}
            className="bg-gray-200 rounded-lg  w-[95%] max-w-xl h-14 lg-h-16 2xl:h-16 mx-auto animate-pulse flex justify-between items-center px-4"
          >
            <p className="size-4 rounded-full bg-gray-300 animate-pulse"></p>
            <p className="h-4 w-22 bg-gray-300 animate-pulse"></p>
            <div>
              <p className="h-2 w-16 bg-gray-300 animate-pulse"></p>
              <p className="h-2 w-18 bg-gray-300 mt-1 animate-pulse"></p>
            </div>
            <p className="h-3 w-14 bg-gray-300 animate-pulse"></p>
          </div>
        );
      })}
    </div>
  );
}

export default PharmacySkeleton;

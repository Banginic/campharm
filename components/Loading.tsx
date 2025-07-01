import React from "react";

function Loading() {
  return (
    <div className="grid place-items-center mt-8">
      <div className="flex items-center gap-4">
        <div className="animate-spin  size-6 rounded-full border border-gray-400 border-t-black border-r-black "></div>
        <h1 className="animate-pulse">Loading...</h1>
      </div>
    </div>
  );
}

export default Loading;

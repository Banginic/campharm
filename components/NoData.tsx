import React from "react";

function NoData({ message }: { message: string }) {
  return (
    <section className="">
      <h1 className="text-lg font-semibold lg:text-2xl">
        No {message} available
      </h1>
    </section>
  );
}

export default NoData;

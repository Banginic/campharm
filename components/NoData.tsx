import React from "react";
import Image, { StaticImageData } from "next/image";

function NoData({ message, photo }: { message: string, photo: StaticImageData }) {
  return (
    <section className="text-center flex flex-col items-center justify-center">
      <Image 
      src={photo}
      alt={`${message} image`}
      width={64}
      height={64}
      />
      <h1 className="text-lg font-semibold lg:text-2xl text-neutral-600">
        No {message} available
      </h1>
    </section>
  );
}

export default NoData;

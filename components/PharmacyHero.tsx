import React from "react";

function PharmacyHero() {
  return (
    <section className="mt-12">
      <h1 className="heading2 montserrat text-center text-3xl lg:text-5xl font-bold leading-10 lg:leading-14.5">
        Manage Your <span className="text-green-900">Pharmacy</span> With
        Confidence- Anytime, Anywhere
      </h1>
      <h3 className=" text-[18px] text-gray-900 mt-2 text-center">
        Track medications, update schedules, and serve your community better.
      </h3>
      <button className="bg-black text-white px-6 cursor-pointer hover:bg-black/80 py-2 rounded mx-auto text-sm flex mt-4">
        Get Started
      </button>
    </section>
  );
}

export default PharmacyHero;

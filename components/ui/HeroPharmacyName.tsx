import { PharmacyDetailsTypes } from "@/models/types";
import { MapPin } from "lucide-react";
import React from "react";

function HeroPharmacyName({ data }: { data: PharmacyDetailsTypes }) {
  return (
    <div className="ml-1 text-green-950  mt-8 lg:mt-0">
      <h1 className="text-xl lg:text-2xl font-bold ">
        {data?.data[0].pharmacyName}
      </h1>
      <div className="flex items-center  space-x-2">
        <MapPin className="size-5 text-green-950/70" />
        <p className="text-green-950/70 text-sm">
          {data?.data[0].address} {data?.data[0].town}
        </p>
      </div>
    </div>
  );
}

export default HeroPharmacyName;

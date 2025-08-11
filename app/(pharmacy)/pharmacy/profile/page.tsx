"use client";
import React from "react";
import { ProfileButton } from "@/pharmacy-components/index";
import { useApiClient } from "@/hooks/useApiPharmacyClient";
import { PharmacyDetailsTypes } from "@/models/types";
import { useQuery } from "@tanstack/react-query";
import { ErrorFetching, Loading, NoData } from "@/components/index";
import { no_drug } from "@/assets/photos";
import { ManualClosePharmcy } from "@/components/index";
import Link from "next/link";
import { MapPin, MapPinned } from "lucide-react";

function Profile() {
  const { apiFetch } = useApiClient<PharmacyDetailsTypes>();
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["pharmacy-details"],
    queryFn:() => apiFetch("api/pharmacy/profile", {
    method: "GET",
    cache: 'no-cache'
  }),
  });

 

  return (
    <div className="max-w-2xl mx-auto relative">
      <h1 className="text-xl font-bold lg:text-3xl text-center">Profile</h1>
      <section className="p-2 liquid-glass mt-8 min-h-60">
        {isPending ? (
          <Loading />
        ) : isError ? (
          <ErrorFetching message={"Drugs"} refetch={refetch} />
        ) : data?.data?.length === 0 ? (
          <NoData message={"Drugs"} photo={no_drug} />
        ) : null}
        {!isPending && data?.data && data?.data.length >0  && (
          <div className="liquid-glass-effect rounded-xl p-4">
            <p className="text-lg font-semibold text-green-600 mb-2">
              {data?.data[0].pharmacyName}
            </p>
            <p className="text-[16px]">{data?.data[0].pharmacistName}</p>
            <p className="text-[16px]">{data?.data[0].phoneNumber}</p>
            <p className="text-[16px]">{data?.data[0].email}</p>
            <p className="text-[16px]">{data?.data[0].town}, {data?.data[0].region} Region</p>
            <p className="text-gray-600 text-[16px]">
              Since: {new Date(data?.data[0].createdAt).toLocaleDateString('en-GB')}
            </p>
            <ManualClosePharmcy data={data} />
            <Link href={'/pharmacy/update-location'}  className="border py-2 rounded px-4 border-gray-400 inline-flex gap-2 text-sm items-center mt-4 w-full cursor-pointer trans hover:border-neutral-800 text-neutral-700">
            <MapPinned size={18} />
            Update Location</Link>
            <ProfileButton pharmacy={data} />
          </div>
        )}
      </section>
    </div>
  );
}

export default Profile;

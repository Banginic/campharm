"use client";
import React from "react";
import { ProfileButton } from "@/pharmacy-components/index";
import { useApiClient } from "@/hooks/useApiPharmacyClient";
import { PharmaciesTypes } from "@/models/types";
import { useQuery } from "@tanstack/react-query";
import { ErrorFetching, Loading, NoData } from "@/components/index";
import { no_drug } from "@/assets/photos";
import { ManualClosePharmcy } from "@/components/index";

function Profile() {
  const { apiFetch } = useApiClient<PharmaciesTypes>();
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["pharmacy-profile"],
    queryFn:() => apiFetch("api/pharmacy/profile", {
    method: "GET",
  }),
  });

  console.log(data);

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
            
            <ManualClosePharmcy />
            <ProfileButton pharmacy={data} />
          </div>
        )}
      </section>
    </div>
  );
}

export default Profile;

"use client";
import {
  at,
  direction,
  doctor,
  email,
  location,
  phone,
  verified,
} from "@/assets/photos";
import { PHARMACIES } from "@/assets/data";
import Image from "next/image";
import { Back, WeekDays } from "@/components/index";
import { useEffect, useState } from "react";
import type { PharmacyType } from "@/models/types";
import { Loading } from "@/components/index";

function PharmacyDetails({ params }: { params: { pharmacyId: string } }) {
  const [pharmacy, setPharmacy] = useState<PharmacyType | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { pharmacyId } = params;

  const pharmacyLocation = {
    latitude: "",
    longitude: "",
  };

  useEffect(() => {
    async function fetchPharmacies() {
      setLoading(true);
      setError("");
      try {
        if (pharmacyId) {
          const res = await fetch(
            `/api/pharmacy?pharmacyId=${encodeURIComponent(pharmacyId)}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          const data = await res.json();
          console.log(data.data);
          if (data.success) {
            setPharmacy(data.data[0]);
            return;
          }
          setError(data.error);
        }
      } catch (ex: unknown) {
        if (ex instanceof Error) {
          setError(ex.message);
        }
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    }
    fetchPharmacies();
    return () => {};
  }, []);

  if (isLoading) return <Loading />;
  return (
    <div className="relative">
      <div className="absolute">
        <Back link="/pharmacies" />
      </div>
      <h1 className="text-xl lg:text-4xl font-bold text-center">
        PHARMACY DETAILS
      </h1>
      <div className="flex gap-4 items-cente flex-col lg:flex-row">
        <section className="mt-8 border border-gray-300 h-66 shadow-md rounded gap-4 p-4 w-sm mx-auto">
          <div className="flex items-center gap-4">
            <Image
              src={verified}
              alt="./placeholder.png"
              width={25}
              className={`${!pharmacy?.isVerified && "hidden"}`}
            />
            <p className="text-lg lg:text-2xl font-bold">
              {pharmacy?.pharmacyName}
            </p>
          </div>
          <div className="mt-4 text-gray-900">
            <div className="flex items-center gap-4 mb-1">
              <Image
                src={doctor}
                alt="./placeholder.png"
                width={20}
                height={20}
              />
              <p className="">{pharmacy?.pharmacistName}</p>
            </div>
            <div className="flex items-center gap-4 mb-1">
              <Image
                src={phone}
                alt="./placeholder.png"
                width={20}
                height={20}
              />
              <p className="">{pharmacy?.phoneNumber}</p>
            </div>
            <div className="flex items-center gap-4 mb-1">
              <Image
                src={email}
                alt="./placeholder.png"
                width={20}
                height={20}
              />
              <p className="">{pharmacy?.email}</p>
            </div>
            <div className="flex items-center gap-4 mb-1">
              <Image
                src={location}
                alt="./placeholder.png"
                width={20}
                height={20}
              />
              <p className="">
                {pharmacy?.town}, {pharmacy?.region} Region
              </p>
            </div>
          </div>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${pharmacyLocation.latitude},${pharmacyLocation.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 hover:bg-green-950 bg-green-900 text-white px-4 py-2 rounded w-full justify-center mt-4 cursor-pointer"
          >
            <Image
              src={direction}
              alt="./placeholder.png"
              width={25}
              height={25}
            />
            <p>Direction</p>
          </a>
        </section>
        <WeekDays />
      </div>
    </div>
  );
}

export default PharmacyDetails;

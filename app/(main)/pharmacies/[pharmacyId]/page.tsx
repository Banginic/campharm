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
import Image from "next/image";
import { Back } from "@/components/index";
import { useEffect, useState, use } from "react";
import type { PharmacyDetailsTypes } from "@/models/types";
import { Loading } from "@/components/index";
import { Forward, Frown, Info, Phone, Wifi } from "lucide-react";
import { getOpeningStatus } from "@/libs/formateOpeningTime";
import { getClosingStatus } from "@/libs/formateClosingTime";

function PharmacyDetails({
  params,
}: {
  params: Promise<{ pharmacyId: string }>;
}) {
  const [pharmacy, setPharmacy] = useState<PharmacyDetailsTypes | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { pharmacyId } = use(params);

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
            `/api/pharmacy/pharmacy-details?pharmacyId=${encodeURIComponent(
              pharmacyId
            )}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          const data = await res.json();
          if (data.success) {
            setPharmacy(data);
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
  if (pharmacy === null) return;
  return (
    <div className="relative max-w-7xl mx-auto mb-8">
      <div className="absolute">
        <Back link="/pharmacies" />
      </div>
      <h1 className="text-xl lg:text-4xl font-bold text-center">
        PHARMACY DETAILS
      </h1>
      <div className="flex gap-4 mt-4 items-cente flex-col lg:flex-row">
        <section className="mt-8 border border-gray-300  w-[90%] lg:w-lg liquid-glass-effect rounded-xl shadow-md gap-4 p-4 mx-auto">
          <div className="flex items-center gap-4">
            <Image
              src={verified}
              alt="./placeholder.png"
              width={25}
              className={`${pharmacy?.data[0].isVerified && "hidden"}`}
            />
            <p className="text-lg lg:text-2xl text-green-600 font-bold">
              {pharmacy?.data[0].pharmacyName}
            </p>
          </div>
          <div className="mt-4 text-green-950">
            <div className="flex items-center gap-4 mb-2">
              <Image
                src={doctor}
                alt="./placeholder.png"
                width={20}
                height={20}
              />
              <p className="flex flex-col">
                <span className="text-sm lg:text-[16px]">{pharmacy?.data[0].pharmacistName}</span>
                <span className="text-xs lg:text-sm text-green-950/60 ">Phamacist</span>
              </p>
            </div>
            <div className="flex items-center gap-4 mb-2 text-sm lg:text-[16px]">
              <Image
                src={phone}
                alt="./placeholder.png"
                width={20}
                height={20}
              />
              <p className="">{pharmacy?.data[0].phoneNumber}</p>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <Image
                src={email}
                alt="./placeholder.png"
                width={20}
                height={20}
              />
              <p className="text-sm lg:text-[16px]">{pharmacy?.data[0].email}</p>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <Image
                src={location}
                alt="./placeholder.png"
                width={20}
                height={20}
              />
              <p className="flex flex-col">
                <span className="text-sm lg:text-[16px}">123. Rd noddr</span>
                <span className="text-xs lg:text-sm text-green-950/60">{pharmacy?.data[0].town}, {pharmacy?.data[0].region} Region</span>
              </p>
            </div>
          </div>
          <div className="flex  w-[90%] mx-auto gap-2 items-center ">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${pharmacyLocation.latitude},${pharmacyLocation.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center w-1/2 gap-4 hover:bg-green-950 bg-green-900 text-white px-4 py-2 rounded  justify-center mt-4 cursor-pointer"
            >
              <Forward size={18} />
              <p>Direction</p>
            </a>
            <a
              href={`tel:${pharmacy?.data[0].phoneNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center flex-1 gap-4 hover:bg-black bg-black/90 text-white px-4 py-2 rounded  justify-center mt-4 cursor-pointer"
            >
              <Phone size={18} />
              <p>Call</p>
            </a>
          </div>
        </section>
        <div className="liquid-glass-effect w-[90%] lg:w-lg mx-auto mt-4 rounded-lg p-2 text-[18px]">
          <div className="flex items-center justify-between px-2 text-neutral-600">
            <h2>Today's Hours</h2>
            <div className="text-sm">
              {pharmacy?.data[0].isOnCall ? (
                <p className="text-green-500 flex items-center gap-2 border rounded-lg p-1">
                  <Wifi size={18} />
                  <span>On Call</span>
                </p>
              ) : (
                <p className="text-red-400 flex items-center gap-2 border rounded-lg p-1">
                  <Frown size={18} />
                  <span>Not on call</span>
                </p>
              )}
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center border border-gray-600/40 p-2 rounded-lg px-4">
            <p className="flex gap-2 text-sm">
              <span>
                {pharmacy?.data[0]?.day.slice(0, 1).toUpperCase() +
                  pharmacy?.data[0]?.day.slice(1)}
              </span>
              {/* <span>{new Date().toLocaleDateString("en-GB")}</span> */}
            </p>

            <div className="flex flex-col text-xs">
              <span className="text-neutral-600">Opening</span>
              <span>
                {pharmacy.data[0]?.isOnCall ? (
                  <span className="text-green-500">Open</span>
                ) : (
                  <div>
                    {getOpeningStatus(pharmacy?.data[0]?.openingTime) ===
                    "Open" ? (
                      <span className="text-green-600">
                        {getOpeningStatus(pharmacy?.data[0]?.openingTime)}
                      </span>
                    ) : (
                      <span className="text-yellow-600">
                        {getOpeningStatus(pharmacy?.data[0]?.openingTime)}
                      </span>
                    )}
                  </div>
                )}
              </span>
            </div>
            <div className="flex flex-col text-xs">
              <p className="text-neutral-600">Closing</p>
              <div>
                {pharmacy?.data[0]?.isOnCall ? (
                  <span className="text-green-500">Open</span>
                ) : (
                  <div>
                    {getClosingStatus(pharmacy?.data[0]?.closingTime) ===
                    "Closed" ? (
                      <span className="text-red-500">
                        {getClosingStatus(pharmacy?.data[0]?.closingTime)}
                      </span>
                    ) : (
                      <span className="text-yellow-600">
                        {getClosingStatus(pharmacy?.data[0]?.closingTime)}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className=" liquid-glass-effec rounded-lg p-2 mt-8 mb-2 bg-green-50/30">
            <div className="flex gap-2 items-center text-green-700">
              <Info size={18} />
              <h3>Emergency On-Call Service</h3>
            </div>
            <p className="text-sm text-neutral-600 mt-2">
              24/7 emergency pharmaceutical services available. Call our main
              number for urgent medication needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PharmacyDetails;

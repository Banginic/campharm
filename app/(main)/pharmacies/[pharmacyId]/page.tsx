"use client";
import { doctor, verified } from "@/assets/photos";
import Image from "next/image";
import { Back, Title } from "@/components/index";
import { useEffect, useState, use } from "react";
import type { PharmacyDetailsTypes } from "@/models/types";
import {
  Ambulance,
  BikeIcon,
  Car,
  Copy,
  Flame,
  Forward,
  Frown,
  Headset,
  Hospital,
  Info,
  Mail,
  MapPin,
  Phone,
  PhoneCall,
  Siren,
  Wifi,
} from "lucide-react";
import { getOpeningStatus } from "@/libs/formateOpeningTime";
import { getClosingStatus } from "@/libs/formateClosingTime";
import PharmacyDetailsSkeleton from "@/components/skeletons/PharmacyDetailsSkeleton";

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

  if (isLoading) return <PharmacyDetailsSkeleton />;
  if (pharmacy === null) return;
  return (
    <div className="relative max-w-7xl mx-auto mb-8">
      <div className="absolute">
        <Back link="/pharmacies" />
      </div>
      <Title text="Pharmacy Details" />

      <div className="flex gap-4 mt-4 items-cente flex-col lg:flex-row">
        <section className="mt-8 border border-neutral-200  w-[95%] lg:w-lg  rounded-xl shadow-md gap-4 p-6 mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                {pharmacy.data[0].isVerified && (
                  <Image
                    src={verified}
                    alt="./placeholder.png"
                    width={25}
                    className={`${pharmacy?.data[0].isVerified && "hidden"}`}
                  />
                )}
              </div>
              <p className="text-lg lg:text-2xl text-green-600 font-bold">
                {pharmacy?.data[0].pharmacyName}
              </p>
            </div>
            <p>
              {pharmacy.data[0].isVerified ? (
                <span className="text-xs text-green-500">Verified</span>
              ) : (
                <span className="text-xs text-yellow-600">Not Verified</span>
              )}
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
                <span className="text-sm lg:text-[16px]">
                  {pharmacy?.data[0].pharmacistName}
                </span>
                <span className="text-xs lg:text-sm text-green-950/60 ">
                  Phamacist
                </span>
              </p>
            </div>
            <div className="flex items-center gap-4 mb-2 text-sm lg:text-[16px] relative">
              <Phone size={20} />
              <p className="text-neutral-600">
                {pharmacy?.data[0].phoneNumber}
              </p>
              <Copy
                className="-top-1 absolute right-60 lg:right-75 cursor-pointer"
                size={14}
              />
            </div>
            <div className="flex items-center gap-4 mb-2">
              <Mail size={20} />
              <p className="text-sm lg:text-[16px] text-neutral-600">
                {pharmacy?.data[0].email}
              </p>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <MapPin size={20} />
              <p className="flex flex-col">
                <span className="text-sm lg:text-[16px} text-indigo-600">
                  123. Rd noddr
                </span>
                <span className="text-xs lg:text-sm text-neutral-600">
                  {pharmacy?.data[0].town}, {pharmacy?.data[0].region} Region
                </span>
              </p>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <BikeIcon size={20} />
              <p className="text-sm lg:text-[16px] text-yellow-600">
                No Delivery
              </p>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <Car size={20} />
              <p className="text-sm lg:text-[16px] text-indigo-600">
                0.9 Km Away
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
        <div className="border border-neutral-200 shadow-md bg-white w-[95%] lg:w-lg mx-auto mt-4 rounded-lg p-6 text-[18px]">
          <div className="flex items-center font-semibold justify-between px-2 text-neutral-600">
            <h2>Today's Hours</h2>
            <div className="text-sm">
              {pharmacy?.data[0].isOnCall ? (
                <p className="text-green-500 flex items-center gap-2 bg-green-100 rounded-lg p-1">
                  <Wifi size={18} />
                  <span>On-Call Today</span>
                </p>
              ) : (
                <p className="text-red-400 flex items-center gap-2  bg-red-50 rounded-lg p-1">
                  <Frown size={18} />
                  <span>Not on-call Today</span>
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

          <div className=" liquid-glass-effec rounded-lg p-4 mt-8 mb-2 bg-neutral-200/50">
            <div className="flex gap-2 items-center text-green-700">
              <Info size={18} />
              <h3>Emergency On-Call Service</h3>
            </div>
            <p className="text-sm text-neutral-600 mt-2">
              24/7 emergency pharmaceutical services available. Call our main
              number for urgent medication needs.
            </p>
          </div>
          <div className="bg-gray-100/50 border border-gray-100 mt-4 rounded-md p-4  text-sm">
            <div>
              <p className="text-sm text-red-900">Emergency numbers</p>
              <div className="flex items-center gap-2 mt-4">
                <Hospital size={20} className="text-green-500" />
                <p className="w-[160px]">Emergency Pharmacy</p>
                <button className="btn text-white flex items-center gap-4 bg-green-600">
                  <PhoneCall size={18} />
                  <a href={`tel:118`} target="_blank" rel="noopener noreferrer">
                    00 00 00 00 00
                  </a>
                </button>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Ambulance size={20} className="text-blue-500" />
                <p className="w-[160px]">Ambulance</p>
                <button className="btn text-white flex items-center gap-4 bg-blue-500">
                  <PhoneCall size={18} />
                  <a href={`tel:112`} target="_blank" rel="noopener noreferrer">
                    112
                  </a>
                </button>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Siren size={20} className="text-red-950" />
                <p className="w-[160px]">Police</p>
                <button className="btn flex items-center gap-4 text-white bg-blue-950">
                  <Headset size={18} />
                  <a href={`tel:112`} target="_blank" rel="noopener noreferrer">
                    112
                  </a>
                </button>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Flame size={20} className="text-red-500 fill-red-500" />
                <p className="w-[160px]">Fire Fighters</p>
                <button
                  title="Call Fire fighters now."
                  className="btn text-white bg-red-500 flex items-center gap-4"
                >
                  <PhoneCall size={18} />
                  <a href={`tel:118`} target="_blank" rel="noopener noreferrer">
                    118
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PharmacyDetails;

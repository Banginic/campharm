"use client";
import {
  Back,
  NoData,
  Loading,
  ErrorFetching,
  Title,
} from "@/components/index";
import { useQuery } from "@tanstack/react-query";
import { no_drug } from "@/assets/photos";
import { useApiClient } from "@/hooks/useApiClient";
import { Bike, BriefcaseBusiness, Car,  Eye,  MapPin,  Phone, Pill, Send, Star, Verified,  } from "lucide-react";
import { PharmacyDrugSchedule } from "@/models/searchTypes";
import Link from "next/link";

function MainDrugDetails({
  pharmacyId,
  drugId,
}: {
  pharmacyId: string;
  drugId: string;
}) {
  const { apiFetch } = useApiClient<PharmacyDrugSchedule>();

  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: [`drugs-${drugId}`],
    queryFn: () =>
      apiFetch(
        `/api/search/pharmacy-single-drug?pharmacyId=${pharmacyId}&drugId=${drugId}`,
        {
          method: "GET",
          cache: "no-cache",
        }
      ),
  });

  return (
    <section className="relative  mb-12">
      <div className="absolute">
        <Back link="/pharmacies" />
      </div>
      <Title text="Drug Details" />
      <div className="mt-12 border  w-[90%] max-w-3xl  mx-auto border-gray-300 ">
        <div>
          <div>
            {isLoading ? (
              <Loading />
            ) : isError ? (
              <ErrorFetching message={"Drugs"} refetch={refetch} />
            ) : !data?.data || data?.data.length === 0 ? (
              <NoData message={"Drug"} photo={no_drug} />
            ) : (
              <div className=" liquid-glass rounded-2xl p-2">
                <div className="liquid-glass-effect justify-between px-4 p-4 rounded-lg">
                  <div className="flex gap-4 justify-between ">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-600 p-2 rounded-md">
                        <Pill size={20} color="white" />
                      </div>
                      <p className="text-xl lg:text-2xl font-semibold">
                        {data.data[0].genericName}
                      </p>
                    </div>

                    <div className="flex items-center flex-col ">
                      <p>{data.data[0].price}</p>
                      <p className="text-sm text-neutral-600">{"Per tablet"}</p>
                    </div>
                  </div>
                  <div className="mt-6 lg:mt-8 grid grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))] gap-4">
                    <p className="text-sm flex flex-col">
                      <span className="text-neutral-600">Generic</span>
                      <span className="text-blue-700">{data.data[0].genericName}</span>
                    </p>
                    <p className="text-sm flex flex-col">
                      <span className="text-neutral-600">Brand</span>
                      <span className="text-purple-700">{data.data[0].tradeName}</span>
                    </p>
                    <p className="text-sm flex flex-col">
                      <span className="text-neutral-600">Form</span>
                      <span className="text-neutral-800">{data.data[0].dosageForm}</span>
                    </p>
                    <p className="text-sm flex flex-col">
                      <span className="text-neutral-600">Strength</span>
                      <span className="text-neutral-800">{data.data[0].dosageStrength}</span>
                    </p>
                    <p className="text-sm flex flex-col">
                      <span className="text-neutral-600">Available</span>
                      <span className="text-green-700">Yes</span>
                    </p>
                  </div>
                  {/* Drug description */}
                  <div className="mt-4 text-sm bg-green-100/30 border border-green-50/30 p-2 rounded">
                    <span className="text-neutral-600">Description</span>
                      <span className="text-neutral-800 block">{data.data[0].description}</span>
                  </div>

                  <div className="mt-6 lg:mt-8 bg-green-50/30 border border-green-50/50 rounded p-4">
                    <p className="flex justify-between items-center mb-2">
                      <span className="text-neutral-600">Available at</span>
                      <span className="text-sm flex gap-1.5 items-center text-green-700">
                        <Verified size={18}  />
                        <span className="text-green-700">Verified</span>
                      </span>
                    </p>
                    <h3 className="text-lg font-semibold text-neutral-800">{data.data[0].pharmacyName}</h3>
                    <div className="flex gap-4 items-center">
                      <span className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-sm text-neutral-600">4.8</span>
                      </span>
                      <span className="flex items-center gap-1 text-neutral-600">
                        <Car size={18}  />
                        <span className="text-sm">0.8 Km</span>
                      </span>
                      <span className="flex items-center text-green-700 gap-1">
                        <span className="size-2 rounded-full bg-green-700"></span>
                        <span className="text-sm">Open</span>
                      </span>
                    </div>

                    <div className="mt-6 lg:mt-8 text-sm flex flex-col gap-1.5">
                      <div className="text-neutral-600 flex items-center gap-2">
                        <MapPin size={18}  />
                        <span>{data.data[0].address} ,{data.data[0].town} </span>
                      </div>
                      <div className="text-blue-400 flex items-center gap-2">
                        <Phone size={18} className="text-neutral-600" />
                        <a href={`tel:${data.data[0].phoneNumber}`}>{data.data[0].phoneNumber} </a>
                      </div>
                      <div className="text-neutral-600 flex items-center gap-2">
                        <Bike size={18}  />
                        <span >No delivery</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 lg:mt-8 flex gap-2 text-sm ">
                      <Link href={`/pharmacies/${data.data[0].pharmacyId}`} className="bg-green-500 flex gap-2 items-center rounded hover:bg-green-600 trans text-white text-sm px-4 py-2 rounded-">
                        <BriefcaseBusiness size={18}/>
                        <span>Visit Pharmacy</span>
                      </Link>
                      <button className="flex gap-2 items-center bg-black/80 hover:bg-black cursor-pointer text-white px-6 py-2 rounded">
                        <Send  size={18}/>
                        <span>Get Directions</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainDrugDetails;

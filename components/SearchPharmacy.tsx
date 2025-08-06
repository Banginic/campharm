"use client";
import {  MapPin, Search, Sparkle, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useDebouncer } from "@/hooks/useDebouncer";
import { useQuery } from "@tanstack/react-query";
import { Spiner } from "./index";
import { searchFilter } from '@/utils/searchFilter'
import { PharmaciesTypes } from "@/models/types";

function SearchPharmacy() {
  const [searchQuery, setSearchQuery] = useState("");
  const debounceQuery = useDebouncer(searchQuery, 400);

  const { data, isLoading } = useQuery({
    queryKey: ["pharmacy", debounceQuery],
    queryFn: () => searchFilter<PharmaciesTypes>(debounceQuery, "/api/pharmacy/list-town-pharmacy-search"),
    enabled: debounceQuery.length > 2,
  });
 

  function handleSearch() {
    setSearchQuery("");
  }
  return (
    <section className="relative">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-2 border border-white/20 w-sm lg:w-lg shadow-2xl ">
        <div className="flex gap-3 items-center">
          <div className="flex items-center flex-1 bg-white rounded-xl px-4 py-2.5">
            <MapPin className="text-gray-400 mr-3" size={20} />
            <input
              type="text"
              placeholder="Enter your location or zip code"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 outline-none text-gray-700 text-xs placeholder-gray-400 lg:text-sm"
            />
          </div>
          <div>
            {searchQuery.length > 2 ? (
              <button
                disabled={isLoading}
                type="submit"
                onClick={handleSearch}
                className="borde bg-green-950/60 text-white border-black/70  text-sm px-4 py-2 rounded-xl cursor-pointer font-semibold transition-all duration-300 lg:hover:scale-105 hover:shadow-lg flex items-center gap-2"
              >
                <span>
                  {isLoading ? (
                    <Spiner height="size-5" color="white" />
                  ) : (
                    <X size={20} />
                  )}
                </span>
                Clear
              </button>
            ) : (
              <button
                type="submit"
                className="borde bg-green-950/60 text-white border-black/70  text-sm px-4 py-2 rounded-xl cursor-pointer font-semibold transition-all duration-300 lg:hover:scale-105 hover:shadow-lg flex items-center gap-2"
              >
                <Search size={20} />
                Search
              </button>
            )}
          </div>
          <Link
            href={"/purpose"}
            className="bg-black hover:bg-black/90 text-white hidden lg:flex justify-center px-4  text-sm mx-aut py-2 rounded-lg gap-2 items-center cursor-pointer"
          >
            <Sparkle size={18} />
            Get Started
          </Link>
        </div>
      </div>
      <div
        className={` ${
          searchQuery.length > 2 ? "absolute" : "hidden"
        } liquid-glass  p-2 top-2 `}
      >
        <div className="liquid-glass-effect min-h-40 rounded-lg p-2">
          <button onClick={() => setSearchQuery("")}>
            <X className="text-green-950/70 absolute top-2 right-2 cursor-pointer hover:bg-white/40 trans rounded " />
          </button>
          {isLoading ? (
            <div className="min-h-full grid place-items-center">
              <Spiner height="size-8" color="text-green-500" />
              <p className="text-sm text-center animate-pulse text-green-500">
                Loadin....
              </p>
            </div>
          ) : !data || data?.data.length === 0 ? (
            <div>
              <h2 className="text-green-950 text-center font-semibold">
                No result found.
              </h2>
              <p className="text-green-950/70 text-center text-sm">
                Please check spellings.
              </p>
            </div>
          ) : (
            <div className="flex flex-col mt-4 gap-2">
              {data?.data.map((pharmacy) => (
                <Link
                  href={`/pharmacies/${pharmacy.id} `}
                  key={pharmacy.id}
                  className="liquid-glass-effect rounded-lg  w-full py-2 px-4 text-sm  flex justify-around items-center"
                >
                  <h3 className="text-green-950">{pharmacy.pharmacyName}</h3>
                  <div className="flex-1 text-center">
                    <h3 className="text-green-950/70 text-xs">Status</h3>
                    <p
                      className={`${
                        pharmacy.isOpen ? "text-green-500" : "text-green-950"
                      }`}
                    >
                      {pharmacy.isOpen ? "Open" : "Closed"}
                    </p>
                  </div>
                 {
                    pharmacy.isOnCall ?  <p className="text-green-500">OnCall</p> :  <p className="text-green-950 sr-only">OffCall</p>
                 }
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default SearchPharmacy;

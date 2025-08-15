"use client";
import React, { useContext, useState } from "react";
import { searchFilter } from "@/utils/searchFilter";
import { Search, Tablets, X, Pill } from "lucide-react";
import { useDebouncer } from "@/hooks/useDebouncer";
import { useQuery } from "@tanstack/react-query";
import { DrugSearchType } from "@/models/types";
import { getClosingStatus } from "@/libs/formateClosingTime";
import Spiner from "./Spiner";
import AppContext from "@/context/AppContext";
import Link from "next/link";

function Searchbar() {
  const { preferedTown } = useContext(AppContext)!;
  const [searchQuery, setQuery] = useState("");
  const debouncedQuery = useDebouncer(searchQuery, 300);

  const { data, isLoading } = useQuery({
    queryKey: ["Drug", debouncedQuery],
    enabled: debouncedQuery.length > 2,
    queryFn: () =>
      searchFilter<DrugSearchType>(
        debouncedQuery,
        `/api/drugs/search-drugs?region=${preferedTown?.region}&city=${preferedTown?.city}&limit=10`
      ),
  });
  function handleSearch() {
    setQuery("");
  }
  return (
    <section className="relative">
      <div className="border bg-gray-100 backdrop:blur-2xl rounded-md border-white/30  py-2.5 px-4 flex gap-1 items-center mx-auto">
        <span className="flex items-center gap-1">
          <Pill className="fill-yellow-400 white" size={20} />
          <Tablets className="text-black" size={25} />
        </span>
        <input
          type="text"
          maxLength={10}
          value={searchQuery}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g Paracetamol"
          className="border-none outline-none flex-1"
          max={8}
        />
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
                  <Spiner height="size-5" color="white"/>
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
      </div>

      {/* Drugs display */}
      <div
        className={` ${
          searchQuery.length > 2 ? "absolute" : "hidden"
        } liquid-glass  p-2 top-2 `}
      >
        <div className="liquid-glass-effect min-h-40 rounded-lg p-2">
          <button onClick={() => setQuery("")}>
            <X className="text-green-950/70 absolute top-2 right-2 cursor-pointer hover:bg-white/40 trans rounded " />
          </button>
          {isLoading ? (
            <div className="min-h-full grid place-items-center">
              <Spiner height="size-8" color="text-green-500" />
              <p className="text-sm text-center animate-pulse text-green-500">
                Loading....
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
              {data?.data.map((item) => (
                <Link
                  href={`/pharmacies/drugs/${item.pharmacyId}/${item.id} `}
                  key={item.id}
                  className="liquid-glass-effect rounded-lg  w-full py-2 px-4 text-sm  flex justify-around items-center"
                >
                  <div className="flex flex-col">
                    <h3 className="text-green-950">{item.genericName}</h3>
                    <h3>{item.tradeName}</h3>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-green-950">{item.dosageStrength}</h3>
                    <h3>{item.dosageForm}</h3>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-green-800 font-semibold">{item.pharmacyName}</h3>
                    <h3 className='text-xs'>{item.town}</h3>
                  </div>
                 
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Searchbar;

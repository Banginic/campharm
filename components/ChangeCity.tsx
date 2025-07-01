"use client";
import AppContext from "@/context/AppContext";
import { redirect } from "next/navigation";
import { useContext } from "react";

function ChangeCity() {
  const { setPreferedTown } = useContext(AppContext)!;
  function handleChangeCity() {
    localStorage.removeItem("preferedTown");
    setPreferedTown(null);
    redirect("/select-location");
  }
  return (
    <button
      onClick={handleChangeCity}
      className="bg-black text-white hover:bg-black/70 trans px-4 py-2 rounded text-sm cursor-pointer font-semibold"
    >
      Change Town
    </button>
  );
}

export default ChangeCity;

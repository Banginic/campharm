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
      className="bg-black text-white flex hover:bg-black/70 gap-1 shadow-md items-center trans px-4 py-2 rounded text-xs cursor-pointer font-semibold"
    >
      <span className="text-nowrap">Change Town</span>
    </button>
  );
}

export default ChangeCity;

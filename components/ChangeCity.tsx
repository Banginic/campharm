"use client";
import AppContext from "@/context/AppContext";
import { MapPinPen } from "lucide-react";
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
      className="bg-purple-800 text-white flex hover:bg-purple-700 gap-1 shadow-md items-center trans px-4 py-2 rounded text-sm cursor-pointer font-medium"
    >
      <MapPinPen size={18} />
      <span className="text-nowrap">Change Town</span>
    </button>
  );
}

export default ChangeCity;

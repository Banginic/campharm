"use client";
import Image from "next/image";
import { uk_flag, france_flag } from "@/assets/photos";
import { useContext } from "react";
import AppContext from "@/context/AppContext";

function Language() {
  const { lang, setLang } = useContext(AppContext)!;

  function toggleLang() {
    if (lang === "en") {
      setLang("fr");
      return;
    }
    setLang("en");
  }
  return (
    <div className="relative group bg-gray-300/30 backdrop:blur-md rounded p-1 ">
      <button className="flex gap-1 cursor-pointer">
        <p className="text-normal">{lang === "en" ? "EN" : "FR"}</p>
        <Image
          src={lang === "en" ? uk_flag : france_flag}
          width={25}
          height={25}
          alt={'Change language on Pharmacam'}
        />
      </button>

      <div className="absolute hidden group-hover:block top-8 group bg-gray-300/30 hover:bg-gray-900/20 w-full right-0 backdrop:blur-md rounded p-1 ">
        <button onClick={toggleLang} className="flex gap-1 cursor-pointer">
          <p className="text-normal">{lang !== "en" ? "EN" : "FR"}</p>
          <Image
            src={lang !== "en" ? uk_flag : france_flag}
            width={25}
            height={25}
            alt={'Change language on Pharmacam'}
          />
        </button>
      </div>
    </div>
  );
}

export default Language;

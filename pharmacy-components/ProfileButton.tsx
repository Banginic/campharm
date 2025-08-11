"use client";
import AppContext from "@/context/AppContext";
import React, { useContext, useState } from "react";
import { MyModal } from "@/components/index";
import { Snowflake, Trash, CaptionsOff } from "lucide-react";
import { PharmacyDetailsTypes } from "@/models/types";

function ProfileButton({ pharmacy }: { pharmacy: PharmacyDetailsTypes }) {
  const [message, setMessage] = useState("");
  const { showModal, setModal } = useContext(AppContext)!;

  function handleClick(action: string) {
    setMessage(action);
    setModal(true);
  }
  return (
    <div>
      <div className="mt-4  relative">
       { pharmacy?.data[0].isFrozen &&  <p className="text-red-400 text-xs flex gap-2 mb-1 items-center ">
        <CaptionsOff size={18} />
        <span>Account is Frozen</span>
        </p>}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleClick(pharmacy?.data[0].isFrozen ? 'Unfreeze' : 'Freeze')}
            className={`border py-2 rounded px-4 border-gray-400 inline-flex gap-2 text-sm items-center cursor-pointer trans hover:border-neutral-800 ${pharmacy.data[0].isFrozen ? 'border-red-400' : ''} text-neutral-700`}
          >
            {" "}
            <Snowflake size={18} />
            <span>
              {
                pharmacy?.data[0].isFrozen ? 'Unfreeze Account' : 'Freeze Account'
              }
            </span>
          </button>
          <button
            onClick={() => handleClick("Delete")}
            className="border py-2 rounded px-4 border-neutral-400 text-sm cursor-pointer inline-flex items-center gap-2 text-neutral-700 hover:bg-red-500 hover:text-red-100 trans hover:red-gray-800"
          >
            <Trash size={18} />
            Permanently Delete Account
          </button>
        </div>
      </div>
      <div className={`${!showModal && "hidden"}`}>
        <MyModal message={message} />
      </div>
    </div>
  );
}

export default ProfileButton;

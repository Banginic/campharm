"use client";
import AppContext from "@/context/AppContext";
import React, { useContext, useState } from "react";
import { MyModal } from "@/components/index";
import { Snowflake, Trash} from 'lucide-react'

function ProfileButton() {
  const [message, setMessage] = useState("");
  const { showModal, setModal } = useContext(AppContext)!;

  function handleClick(action: string) {
    setMessage(action);
    setModal(true);
  }
  return (
    <div>
      <div className="mt-8 flex gap-4 relative">
        <button
          onClick={() => handleClick("Freeze")}
          className="border py-2 rounded px-4 border-gray-400 flex gap-2 items-center cursor-pointer trans hover:border-gray-800"
        > <Snowflake size={18} />
          Freeze account
        </button>
        <button
          onClick={() => handleClick("Delete")}
          className="border py-2 rounded px-4 border-red-400 cursor-pointer flex items-center gap-2 text-red-500 hover:bg-red-100 trans hover:red-gray-800"
        ><Trash size={18}  />
          Delete account
        </button>
      </div>
      <div className={`${!showModal && "hidden"}`}>
        <MyModal message={message} />
      </div>
    </div>
  );
}

export default ProfileButton;

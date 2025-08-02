"use client";
import AppContext from "@/context/AppContext";
import React, { useContext } from "react";
import { Ban, Frown } from 'lucide-react'
import { freezeProfile, deleteProfile } from "@/libs/freeze-delete-profile";

function MyModal({ message }: { message: string }) {
  const { showModal, setModal } = useContext(AppContext)!;

  function handleConfirmation() {
    setTimeout(() => setModal(false), 1000);
    if (message === "Delete") {
      deleteProfile();
      return;
    }
    freezeProfile();
  }
  return (
    <div
      className={`fixed inset-0 bg-black/80 backdrop:blur-md grid place-items-center`}
    >
      <article className="border rounded p-2 liquid-glass w-sm">
        <div className="p-4 rounded-xl border border-gray-300 bg-green-100">
          <h1 className="text-lg font-semibold lg:text-xl">
            {message} this account?
          </h1>
          <p className="text-neutral-600">
            This process is {message === "Delete" && "not"} reversible
          </p>
          <div className="mt-12 flex gap-4 justify-end">
            <button
              onClick={() => setModal(false)}
              className="border py-2 rounded px-4 flex items-center gap-2 border-gray-400 cursor-pointer trans hover:border-gray-800"
            >
              <Ban size={18}/>
              Cancel
            </button>
            <button
              onClick={handleConfirmation}
              className="border py-2 rounded px-4 flex items-center gap-2 bg-black text-white cursor-pointer  hover:bg-black/80 trans hover:red-gray-800"
            ><Frown size={18} />
              Yes! {message}
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

export default MyModal;

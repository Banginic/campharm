"use client";
import React, { type FormEvent, useContext, useState } from "react";
import { CAMEROON } from "@/assets/data";
import { redirect } from "next/navigation";
import AppContext from "@/context/AppContext";

function SetLocation() {
  const { setPreferedTown } = useContext(AppContext)!
  const [index, setIndex] = useState(1);
  const [formData, setFormData] = useState({
    region: "",
    city: "",
  });

  const selectedRegion =
    formData.region && CAMEROON.find((item) => item.region === formData.region);

  function clearForm() {
    setFormData({ region: "", city: "" });
  }
  function cancelForm() {
    clearForm();
    redirect("/purpose");
  }
  function handleRegionForm(event: FormEvent) {
    event.preventDefault();
    setIndex(2);
  }
  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    setIndex(3);
  }
  async function fetchPharmacies() {
    localStorage.removeItem("preferedTown");
    localStorage.setItem("preferedTown", JSON.stringify(formData));
    setPreferedTown(formData)
    clearForm();
    redirect("/pharmacies");
  }

  return (
    <section className="border border-gray-300 bg-gray-300/20 backdrop:blur-md mt-30 liquid-glass-effect rounded-xl w-[95%] max-w-md mx-auto p-4">
      <div className="flex items-center gap-2">
        <span className="h-2 w-10 bg-black rounded border"></span>
        <span
          className={`h-2 w-10 ${
            index === 2 || index === 3 ? "bg-black" : ""
          } rounded border border-gray-400`}
        ></span>
        <span
          className={`h-2 w-10 ${
            index === 3 && "bg-black"
          } rounded border border-gray-400`}
        ></span>
      </div>
      <div>
        {index === 1 && (
          <form onSubmit={handleRegionForm} className="mt-8">
            <div className="flex flex-col mb-4 gap-0.5">
              <label htmlFor="regions">Region</label>
              <select
                value={formData.region}
                required
                onChange={(e) =>
                  setFormData({ ...formData, region: e.target.value })
                }
                className="border border-gray-400 py-2.5 px-4 rounded cursor-pointer"
              >
                <option value="">Please select region</option>
                {CAMEROON.map((item) => (
                  <option key={item.region} value={item.region}>
                    {item.region}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-4 justify-end mt-8">
              <button
                onClick={cancelForm}
                type="button"
                className="border px-4 py-2 hover:scale-x-105 trans rounded shadow cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-black px-4 py-2 hover:scale-x-105 trans text-white rounded shadow cursor-pointer"
              >
                Next
              </button>
            </div>
          </form>
        )}

        {/* Select city */}
        {index === 2 && (
          <form onSubmit={handleFormSubmit} className="mt-8">
            <div className="flex flex-col mb-4 gap-0.5">
              <label htmlFor="city">City / Town</label>
              <select
                value={formData.city}
                required
                name="city"
                id="city"
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="border border-gray-400 py-2.5 px-4 rounded cursor-pointer"
              >
                <option value="">Please select city / town</option>
                {selectedRegion &&
                  selectedRegion.towns.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex gap-4 justify-end mt-8">
              <button
                type="button"
                onClick={() => setIndex(1)}
                className="border px-4 py-2 hover:scale-x-105 trans rounded shadow cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-black px-4 py-2 hover:scale-x-105 trans text-white rounded shadow cursor-pointer"
              >
                Next
              </button>
            </div>
          </form>
        )}

        {/* Confirm details */}
        {index === 3 && (
          <div>
            <h2 className="text-lg mt-4 text-center font-semibold">
              CONFIRM DETAILS
            </h2>
            <div className="mt-4">
              <p className="text-neutral-600">
                Region: <span className="text-neutral-900 font-semibold">{formData.region}</span>
              </p>
              <p className="text-neutral-600">
                Town: <span className="text-neutral-900 font-semibold">{formData.city}</span>
              </p>
            </div>
            <div className="flex gap-4 justify-end mt-8">
              <button
                type="button"
                onClick={() => setIndex(2)}
                className="border px-4 py-2 hover:scale-x-105 trans rounded shadow cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={fetchPharmacies}
                className="bg-black px-4 py-2 hover:scale-x-105 trans text-white rounded shadow cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default SetLocation;

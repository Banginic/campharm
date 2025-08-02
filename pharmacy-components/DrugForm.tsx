"use client";
import React, { useContext, useState } from "react";
import { close_menu } from "@/assets/photos";
import Image from "next/image";
import { dosageForms } from "@/assets/data";
import { PharmacyContext } from "@/context/PharmacyProvider";
import type { ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";
import { Span } from "next/dist/trace";
import { Send } from "lucide-react";

function DrugForm() {
  const { pharmacyDetails } = useContext(PharmacyContext)!;
  const { setDrugForm } = useContext(PharmacyContext)!;
  const [formState, setFormState] = useState({ error: "", isLoading: false });
  const [formData, setFormData] = useState({
    genericName: "",
    tradeName: "",
    dosageForm: "",
    dosageStrength: "",
    price: "",
    pharmacyId: pharmacyDetails?.id,
  });
  function clearForm() {
    setFormData({
      genericName: "",
      tradeName: "",
      dosageForm: "",
      dosageStrength: "",
      price: "",
      pharmacyId: pharmacyDetails?.id,
    });
  }
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  async function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    setFormState({ error: "", isLoading: true });
    try {
      const res = await fetch("/api/add-drug", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        clearForm();
        return 
      }
      setFormState({...formState, error: data.error})
    } catch (ex: unknown) {
      if (ex instanceof Error) {
        setFormState({ ...formState, error: ex.message });
      }
      setFormState({ ...formState, error: "Error occoured submiting form" });
    } finally {
      setFormState({ ...formState, isLoading: false });
    }
  }

  return (
    <div className="liquid-glass p-2 ">
      <div className="bg-green-100 p-4 w-sm rounded-xl relative">
      <button
        onClick={() => setDrugForm(false)}
        className="absolute top-4 right-4 cursor-pointer"
      >
        <Image
          src={close_menu}
          alt="./placeholder.png"
          width={25}
          className="hover:scale-110"
        />
      </button>
      <form onSubmit={handleFormSubmit} className="text-sm 2xl:text-[16px]">
        <h1 className="text-center text-lg lg:text-2xl font-bold mt-4">
          Add New Drug
        </h1>
        <div className="mt-8 mb-4">
          <label htmlFor="genericName" className="block mb-1">
            Generic name
          </label>
          <input
            type="text"
            id="genericName"
            placeholder="Paracetamol"
            className="w-full py-2 px-4 border border-gray-400 rounded"
            required
            value={formData.genericName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tradeName" className="block mb-1">
            Trade name
          </label>
          <input
            type="text"
            id="tradeName"
            placeholder="Panadol"
            className="w-full py-2 px-4 border border-gray-400 rounded"
            required
            value={formData.tradeName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dosageStrength" className="block mb-1">
            Dosage strength
          </label>
          <input
            type="text"
            id="dosageStrength"
            placeholder="500mg"
            className="w-full py-2 px-4 border border-gray-400 rounded"
            required
            value={formData.dosageStrength}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dosageForm" className="block mb-1">
            Dosage form
          </label>
          <select
            className="w-full py-2 px-4 border border-gray-400 rounded"
            required
            name="dosageForm"
            id="dosageForm"
            value={formData.dosageForm}
            onChange={handleChange}
          >
            <option value="">Please select dosage form</option>
            {dosageForms.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block mb-1">
            Price
          </label>
          <input
            type="number"
            id="price"
            placeholder="500"
            className="w-full py-2 px-4 border border-gray-400 rounded"
            required
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <button
          disabled={formState.isLoading}
          className="bg-black disabled:bg-gray-700 flex items-center justify-center font-semibold text-white w-full py-2 px-4 rounded mt-4 cursor-pointer hover:bg-black/70 trans"
        >
          {formState.isLoading ? "Submiting..." : <span className=" flex items-center gap-2">
            <Send size={18} />
            <span>Add Drug</span>
            </span>}
        </button>
        <p
          aria-label="error message"
          className="text-center text-red-500 mb-3 h-5 mt-1"
        >
          {formState.error}
        </p>
      </form>
    </div>
    </div>
  );
}

export default DrugForm;

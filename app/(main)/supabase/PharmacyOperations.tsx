"use client";
import { supabase } from "@/app/superbaseClient";
import { pharmacyTable } from "@/drizzle/schema";
import React, { FormEvent, useEffect, useState } from "react";

interface Pharmacies {
  id: number;
  pharmacy_name: string;
  region: string;
  city: string;
  created_at: Date;
}
function PharmacyOperations() {
  const [formData, setFormData] = useState({
    pharmacy_name: "",
    region: "",
    city: "",
  });
  const [pharmacies, setPharmacies] = useState<Pharmacies[] | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const { error, data } = await supabase
        .from("pharmaciesTable")
        .insert(formData)
        .single();

      if (error) {
        console.error("Error adding pharmacy: ", error.message);
      }
    } catch (ex) {
      if (ex instanceof Error) {
        console.log(ex.message);
      }
      console.log("Error sending data");
    }
  }
  async function fetchPharmacies() {
    const { data, error } = await supabase
      .from("pharmaciesTable")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error adding pharmacy: ", error.message);
      return;
    }

    setPharmacies(data);
  }
  async function deletePharmacy(id: number) {
    const { data, error } = await supabase
      .from("pharmaciesTable")
      .delete().eq('id' , id)
      
      fetchPharmacies()
    if (error) {
      console.error("Error deleting pharmacy: ", error.message);
      return;
    }

    setPharmacies(data);
  }

  useEffect(() => {
    fetchPharmacies();
  }, []);

  return (
    <div className="min-h-screen ">
      <h1 className="text-center">Supabase Example</h1>
      <div className="max-w-lg mx-auto my-4">
        {pharmacies?.length !== 0 &&
          pharmacies?.map((item) => (
            <article
              key={item.id}
              className="p-4 rounded-2xl shadow border my-1 hover:bg-gray-100 border-gray-300 cursor-pointer flex items-center justify-between"
            >
              <p>{item.pharmacy_name}</p>
              <p>{item.region}</p>
              <p>{item.city}</p>
              <button
              onClick={() => deletePharmacy(item.id)}
              className="text-red-500 text-sm ">Delete</button>
            </article>
          ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-sm mx-auto p-6 border rounded-md shadow-md border-gray-300"
      >
        <div className="mt-4 mb-3">
          <label
            htmlFor="pharmcyName"
            className="block mb-1 text-sm text-gray-600"
          >
            Pharmacy name
          </label>
          <input
            type="text"
            value={formData.pharmacy_name}
            onChange={(e) =>
              setFormData({ ...formData, pharmacy_name: e.target.value })
            }
            placeholder="Mercy pharmacy"
            className="border w-full border-gray-300 py-2 px-4 rounded-md"
          />
        </div>
        <div className="mt-4 mb-3">
          <label htmlFor="region" className="block mb-1 text-sm text-gray-600">
            Region
          </label>
          <input
            type="text"
            value={formData.region}
            onChange={(e) =>
              setFormData({ ...formData, region: e.target.value })
            }
            placeholder="Littoral"
            className="border w-full border-gray-300 py-2 px-4 rounded-md"
          />
        </div>
        <div className="mt-4 mb-3">
          <label htmlFor="city" className="block mb-1 text-sm text-gray-600">
            Town / City
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="Douala"
            className="border w-full border-gray-300 py-2 px-4 rounded-md"
          />
        </div>
        <button className="w-full bg-blue-500 text-white py-2 rounded-md cursor-pointer mt-4">
          Submit
        </button>
      </form>
    </div>
  );
}

export default PharmacyOperations;

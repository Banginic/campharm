"use client";
import React, { useContext, useState } from "react";
import { close_menu } from "@/assets/photos";
import Image from "next/image";
import { dosageForms } from "@/assets/data";
import { PharmacyContext } from "@/context/PharmacyProvider";
import { toast } from "react-toastify";
import { Send } from "lucide-react";
import { DrugSchema, DrugSchemaType } from "@/schemas/drugSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { queryClient } from "@/app/(pharmacy)/layout";
import { useMutation } from "@tanstack/react-query";
import { Spiner } from "@/components";

function DrugForm() {
  const router = useRouter();
  const { pharmacyDetails } = useContext(PharmacyContext)!;
  const { setDrugForm } = useContext(PharmacyContext)!;
  const [formState, setFormState] = useState({ error: "", isLoading: false });

  async function postDrug(drugData: DrugSchemaType) {
    const res = await fetch(
      `/api/drugs/add-drug?pharmacyId=${pharmacyDetails?.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            localStorage.getItem("pharmacy-token") ?? ""
          }`,
        },
        body: JSON.stringify(drugData),
      }
    );
    const data = await res.json();
  }
  function useAddDrugMutation() {
    return useMutation({
      mutationFn: (drugData: DrugSchemaType) => postDrug(drugData),
    });
  }

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<DrugSchemaType>({ resolver: zodResolver(DrugSchema) });

  const { isPending, mutate, isError } = useAddDrugMutation();

  const onSubmit = async (formaData: DrugSchemaType) => {
  const data =   mutate(formaData, {
      onSuccess: () => {
        reset();
        toast.success('Drug added successfully'),
          queryClient.invalidateQueries({ queryKey: ["drugs"] });
        setDrugForm(false);
      },
      onError: (errors: any) => {
        toast.error("Error posting drug.");
        console.log(errors)
      },
    });

  };

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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-sm 2xl:text-[16px]"
        >
          <h1 className="text-center text-lg lg:text-2xl font-bold mt-4">
            Add New Drug
          </h1>
          <div className="mt-8 mb-2">
            <label htmlFor="genericName" className="block mb-1">
              Generic name
            </label>
            <input
              type="text"
              placeholder="Paracetamol"
              className="w-full py-2 px-4 border border-gray-400 rounded"
              {...register("genericName", { required: true })}
            />
            {errors.genericName?.message && (
              <p className="text-red-400 mt-1">
                {errors?.genericName?.message}
              </p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="tradeName" className="block mb-1">
              Trade name{" "}
              <span className="text-xs text-neutral-500 italic">
                (Optional)
              </span>
            </label>
            <input
              type="text"
              placeholder="Panadol"
              className="w-full py-2 px-4 border border-gray-400 rounded"
              {...register("tradeName")}
            />
            {errors.tradeName && (
              <p className="text-red-400 mt-1">{errors?.tradeName?.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="dosageStrength" className="block mb-1">
              Dosage strength
            </label>
            <input
              type="text"
              id="dosageStrength"
              placeholder="500mg"
              className="w-full py-2 px-4 border border-gray-400 rounded"
              {...register("dosageStrength", { required: true })}
            />
            {errors.dosageStrength && (
              <p className="text-red-400 mt-1">
                {errors?.dosageStrength?.message}
              </p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="dosageForm" className="block mb-1">
              Dosage form
            </label>
            <select
              className="w-full py-2 px-4 border border-gray-400 rounded"
              required
              id="dosageForm"
              {...register("dosageForm", { required: true })}
            >
              <option value="">Please select dosage form</option>
              {dosageForms.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {errors.dosageForm && (
              <p className="text-red-400 mt-1">{errors?.dosageForm?.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="block mb-1">
              Price XAF{" "}
              <span className="text-xs text-neutral-500 italic">
                (Optional)
              </span>
            </label>
            <input
              type="number"
              id="price"
              placeholder="500"
              className="w-full py-2 px-4 border border-gray-400 rounded"
              {...register("price", { valueAsNumber: true })}
            />
            {errors.price && (
              <p className="text-red-400 mt-1">{errors?.price?.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="block mb-1">
              Description{" "}
              <span className="text-xs text-neutral-500 italic">
                (Optional)
              </span>
            </label>
            <textarea
              id="description"
              placeholder="Description"
              className="w-full py-2 px-4 border border-gray-400 rounded"
              {...register("description")}
            ></textarea>
            {errors.description && (
              <p className="text-red-400 mt-1">
                {errors?.description?.message}
              </p>
            )}
          </div>
          <button
            disabled={formState.isLoading}
            className="bg-black disabled:bg-gray-700 flex items-center justify-center font-semibold text-white w-full py-2 px-4 rounded mt-4 cursor-pointer hover:bg-black/70 trans"
          >
            {isPending ? (
              <Spiner height="size-5" color="white" />
            ) : (
              <span className=" flex items-center gap-2">
                <Send size={18} />
                <span>Add Drug</span>
              </span>
            )}
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

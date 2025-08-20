"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { CAMEROON } from "@/assets/data";
import { toast } from "react-toastify";
import { SignUpSchema, SignUpSchemaType } from "@/schemas/pharmacyAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Blend,
  Building,
  Hospital,
  Lock,
  Mail,
  Phone,
  UserLock,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { PharmacyContext } from "@/context/PharmacyProvider";

function Signup() {
  const {setPharmacyDetails} = useContext(PharmacyContext)!
  const router = useRouter()
  const [region, setRegion] = useState("");
  const [formState, setFormState] = useState({ isLoading: false, error: "" });
  const town = region && CAMEROON.find((item) => item.region === region);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema) });

  const onSubmit = async (formData: SignUpSchemaType) => {
    setFormState({ isLoading: true, error: "" });

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        localStorage.setItem("pharmacy-token", data.token);
        localStorage.setItem('pharmacyDetails', JSON.stringify(data?.data))
        setPharmacyDetails(data?.data)
        reset();
        setTimeout(() => router.push('/pharmacy/login'), 2000)
      }
      toast.error(data.error);
      setFormState({ ...formState, error: data.error });
    } catch (ex: unknown) {
      if (ex instanceof Error) {
        setFormState({ ...formState, error: ex.message });
      }
      setFormState({ ...formState, error: "Error occured during regitration" });
    } finally {
      setFormState({ ...formState, isLoading: false });
    }
  };

  return (
    <div className="grid place-items-center">
      <div className="liquid-glass p-2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-sm liquid-glass-effect rounded-xl py-6 px-8"
        >
          <h1 className="text-center font-bold text-2xl lg:text-3xl">
            Register
          </h1>
          <div className="mb-4 mt-8">
            <label htmlFor="pharmacyName" className="block">
              Pharmacy name
            </label>
            <div className="flex items center gap-2 border rounded py-2 px-4 bg-transparent shadow border-gray-400">
              <Hospital size={25} />
              <input
                type="text"
                placeholder="Mercy Pharmacy"
                autoComplete="pharmacyName"
                {...register("pharmacyName", { required: true })}
                className="border-none outline-none w-full"
              />
            </div>
            {errors.pharmacyName && (
              <p className="text-red-400 text-sm mt-0.5">
                {errors.pharmacyName.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block">
              Email
            </label>
            <div className="flex items center gap-2 border rounded py-2 px-4 bg-transparent shadow border-gray-400">
              <Mail size={25} />
              <input
                type="email"
                placeholder="example@email.com"
                autoComplete="email"
                {...register("email", { required: true })}
                className="border-none outline-none w-full"
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-sm mt-0.5">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="pharmacistName" className="block">
              Pharmacist's name
            </label>
            <div className="flex items center gap-2 border rounded py-2 px-4 bg-transparent shadow border-gray-400">
              <UserLock size={25} />
              <input
                type="text"
                placeholder="Dr. John Duo"
                autoComplete="pharmacistName"
                {...register("pharmacistName", { required: true })}
                className="border-none outline-none w-full"
              />
            </div>
            {errors.pharmacistName && (
              <p className="text-red-400 text-sm mt-0.5">
                {errors.pharmacistName.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block">
              Phone number
            </label>
            <div className="flex items center gap-2 border rounded py-2 px-4 bg-transparent shadow border-gray-400">
              <Phone size={25} />
              <input
                type="text"
                placeholder="+ 237 653 774 159"
                autoComplete="phone number"
                {...register("phoneNumber", { required: true })}
                className="border-none outline-none w-full"
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-red-400 text-sm mt-0.5">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="region" className="block">
              Region
            </label>
            <div className="flex items center gap-2 border rounded py-2 px-4 bg-transparent shadow border-gray-400">
              <Blend size={25} />
              <select
                {...register("region", {
                  required: true,
                  onChange: (e) => setRegion(e.target.value),
                })}
                className="border-none outline-none w-full"
              >
                <option value="">Please select region</option>
                {CAMEROON &&
                  CAMEROON.map((item) => (
                    <option key={item.region} value={item.region}>
                      {item.region}
                    </option>
                  ))}
              </select>
            </div>
            {errors.region && (
              <p className="text-red-400 text-sm mt-0.5">
                {errors.region.message}
              </p>
            )}
          </div>
          <div className={`mb-4 ${region === "" && "opacity-50"}`}>
            <label htmlFor="town" className="block">
              Town
            </label>
            <div className="flex items center gap-2 border rounded py-2 px-4 bg-transparent shadow border-gray-400">
              <Building size={25} />
              <select
                disabled={region === ""}
                {...register("town", { required: true })}
                className="border-none outline-none w-full disabled:cursor-not-allowed"
              >
                <option value="">Please select town</option>
                {town &&
                  town?.towns.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
            </div>
            {errors.town && (
              <p className="text-red-400 text-sm mt-0.5">
                {errors.town.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block">
              Password
            </label>
            <div className="flex items center gap-2 border rounded py-2 px-4 bg-transparent shadow border-gray-400">
              <Lock size={25} />
              <input
                type="password"
                placeholder="Enter your password"
                autoComplete="password"
                {...register("password", { required: true })}
                className="border-none outline-none w-full"
              />
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm mt-0.5">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={formState.isLoading}
            className={`w-full mt-8 cursor-pointer bg-black disabled:bg-gray-500 disabled:animate-pulse hover:bg-black/80 text-white py-2 rounded font-semibold`}
          >
            {formState.isLoading ? "Loading..." : "Create account"}
          </button>
          <p className="text-red-500  text-center mt-1">{formState.error}</p>
          <div className="flex items-center gap-4 justify-center mt-2 text-sm">
            <p>Already have an account?</p>
            <Link
              href={"/pharmacy/login"}
              className="text-blue-800 font-semibold cursor-pointer hover:underline"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

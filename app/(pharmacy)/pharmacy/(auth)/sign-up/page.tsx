"use client";
import {
  password,
  phone,
  email,
  doctor,
  pharmacy,
  region,
  town_logo,
} from "@/assets/photos";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import type { FormEvent } from "react";
import { CAMEROON } from "@/assets/data";
import { toast } from "react-toastify";


function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    pharmacyName: "",
    pharmacistName: "",
    phoneNumber: "",
    region: "",
    town: "",
  });
  const [formState, setFormState] = useState({ isLoading: false, error: "" });
  const town =
    formData.region && CAMEROON.find((item) => item.region === formData.region);

  async function handleFormSumbit(event: FormEvent) {
    event.preventDefault();
    setFormState({ isLoading: true, error: "" });

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      console.log(data.error)
      if (data.success) {
        toast.success(data.message);
        localStorage.setItem("token", data.token);
        return;
      }
      toast.error(data.error)
      setFormState({ ...formState, error: data.error });
      
    } catch (ex: unknown) {
      if (ex instanceof Error) {
        setFormState({ ...formState, error: ex.message });
      }
      setFormState({ ...formState, error: "Error occured during regitration" });
    } finally {
      setFormState({ ...formState, isLoading: false });
    }
  }
  return (
    <div className="grid place-items-center">
      <form
        onSubmit={handleFormSumbit}
        className="border rounded w-sm border-gray-300 bg-gray-300/20 backdrop:blur-md py-6 px-8"
      >
        <h1 className="text-center font-bold text-2xl lg:text-3xl">Register</h1>
        <div className="mb-4 mt-8">
          <label htmlFor="pharmacyName" className="block">
            Pharmacy name
          </label>
          <div className="flex items center gap-2 border rounded py-2 px-4 bg-white shadow border-gray-400">
            <Image
              src={pharmacy}
              width={25}
              height={25}
              alt="./placeholder.png"
            />
            <input
              type="text"
              placeholder="Mercy Pharmacy"
              required
              autoComplete="pharmacyName"
              value={formData.pharmacyName}
              name="pharmacyName"
              onChange={(e) =>
                setFormData({ ...formData, pharmacyName: e.target.value })
              }
              className="border-none outline-none w-full"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block">
            Email
          </label>
          <div className="flex items center gap-2 border rounded py-2 px-4 bg-white shadow border-gray-400">
            <Image src={email} width={25} height={25} alt="./placeholder.png" />
            <input
              type="email"
              placeholder="example@email.com"
              required
              autoComplete="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="border-none outline-none w-full"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="pharmacistName" className="block">
            Pharmacist's name
          </label>
          <div className="flex items center gap-2 border rounded py-2 px-4 bg-white shadow border-gray-400">
            <Image
              src={doctor}
              width={25}
              height={25}
              alt="./placeholder.png"
            />
            <input
              type="text"
              placeholder="Dr. John Duo"
              required
              autoComplete="pharmacistName"
              value={formData.pharmacistName}
              name="pharmacistName"
              onChange={(e) =>
                setFormData({ ...formData, pharmacistName: e.target.value })
              }
              className="border-none outline-none w-full"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block">
            Phone number
          </label>
          <div className="flex items center gap-2 border rounded py-2 px-4 bg-white shadow border-gray-400">
            <Image src={phone} width={25} height={25} alt="./placeholder.png" />
            <input
              type="text"
              placeholder="+ 237 653 774 159"
              required
              autoComplete="phone number"
              value={formData.phoneNumber}
              name="phoneNumber"
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              className="border-none outline-none w-full"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="region" className="block">
            Region
          </label>
          <div className="flex items center gap-2 border rounded py-2 px-4 bg-white shadow border-gray-400">
            <Image
              src={region}
              width={25}
              height={25}
              alt="./placeholder.png"
            />
            <select
              required
              value={formData.region}
              onChange={(e) =>
                setFormData({ ...formData, region: e.target.value })
              }
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
        </div>
        <div className={`mb-4 ${formData.region === "" && "opacity-50"}`}>
          <label htmlFor="town" className="block">
            Town
          </label>
          <div className="flex items center gap-2 border rounded py-2 px-4 bg-white shadow border-gray-400">
            <Image
              src={town_logo}
              width={25}
              height={25}
              alt="./placeholder.png"
            />
            <select
              required
              disabled={formData.region === ""}
              value={formData.town}
              onChange={(e) =>
                setFormData({ ...formData, town: e.target.value })
              }
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
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block">
            Password
          </label>
          <div className="flex items center gap-2 border rounded py-2 px-4 bg-white shadow border-gray-400">
            <Image
              src={password}
              width={20}
              height={20}
              alt="./placeholder.png"
            />
            <input
              type="password"
              placeholder="Enter your password"
              required
              autoComplete="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="border-none outline-none w-full"
            />
          </div>
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
  );
}

export default Signup;

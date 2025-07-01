"use client";
import { person, password } from "@/assets/photos";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import type { FormEvent } from "react";
import { toast } from "react-toastify";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formState, setFormState] = useState({ isLoading: false, error: "" });
  function clearForm() {
    setFormData({ email: "", password: "" });
  }
  async function handleFormSumbit(event: FormEvent) {
    event.preventDefault();
    setFormState({ isLoading: true, error: "" });
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      console.log(data.error);
      if (data.success) {
        toast.success(data.message);
        localStorage.setItem("token", data.token);
        return;
      }

      setFormState({ ...formState, error: data.error });
    } catch (ex: unknown) {
      if (ex instanceof Error) {
        setFormState({ ...formState, error: ex.message });
      }
      setFormState({ ...formState, error: "Error occoured logging in" });
    } finally {
      // setFormState({...formState, isLoading: false})
      clearForm();
    }
  }
  return (
    <div className="grid place-items-center">
      <form
        onSubmit={handleFormSumbit}
        className="border rounded w-sm border-gray-300 bg-gray-300/20 backdrop:blur-md py-6 px-8"
      >
        <h1 className="text-center font-bold text-2xl lg:text-3xl">Login</h1>
        <div className="mt-8 mb-4">
          <label htmlFor="email" className="block">
            Email
          </label>
          <div className="flex items center gap-2 border rounded py-2 px-4 bg-white shadow border-gray-400">
            <Image
              src={person}
              width={25}
              height={25}
              alt="./placeholder.png"
            />
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
          <label htmlFor="password" className="block">
            Password
          </label>
          <div className="flex items center gap-2 border rounded py-2 px-4 bg-white shadow border-gray-400">
            <Image
              src={password}
              width={25}
              height={25}
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
        <div>
          <button className="text-gray-600 cursor-pointer">
            Forgor password
          </button>
        </div>
        <button
          type="submit"
          disabled={formState.isLoading}
          className={`w-full mt-8 cursor-pointer bg-black disabled:bg-gray-500 disabled:animate-pulse hover:bg-black/80 text-white py-2 rounded font-semibold`}
        >
          {formState.isLoading ? "Logging in..." : "Login"}
        </button>
        <p className="text-red-500 h-4 text-center mt-1">{formState.error}</p>
        <div className="flex items-center gap-4 justify-center mt-2 text-sm">
          <p>Don't have an account?</p>
          <Link
            href={"/pharmacy/sign-up"}
            className="text-blue-800 font-semibold cursor-pointer hover:underline"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;

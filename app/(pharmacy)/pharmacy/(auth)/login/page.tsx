import { person, password } from "@/assets/photos";
import Image from "next/image";
import React from "react";

function Login() {
  return (
    <div className="grid place-items-center">
      <form
        action="#"
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
              width={20}
              height={20}
              alt="./placeholder.png"
            />
            <input
              type="email"
              placeholder="example@email.com"
              required
              autoComplete="email"
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
              width={20}
              height={20}
              alt="./placeholder.png"
            />
            <input
              type="password"
              placeholder="Enter your password"
              required
              autoComplete="password"
              className="border-none outline-none w-full"
            />
          </div>
        </div>
        <div>
          <button className="text-gray-600 cursor-pointer">
            Forgor password
          </button>
        </div>
        <button className="w-full mt-8 cursor-pointer bg-black hover:bg-black/80 text-white py-2 rounded font-semibold">
          Login
        </button>
        <p className="text-red-500 h-4 text-center mt-1"></p>
        <div className="flex items-center gap-4 justify-center mt-2 text-sm">
          <p>Don't have an account?</p>
          <p className="text-blue-800 font-semibold cursor-pointer hover:underline">
            Register
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;

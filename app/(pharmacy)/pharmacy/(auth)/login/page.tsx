"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PharmacyContext } from "@/context/PharmacyProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginSchemaType } from "@/schemas/pharmacyAuth";
import { Mail, Lock, Send } from "lucide-react";
import { Spiner } from "@/components";
import { signIn } from "next-auth/react";

function Login() {
  const router = useRouter()
  const { setPharmacyDetails } = useContext(PharmacyContext)!;

  const [formState, setFormState] = useState({ isLoading: false, error: "" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });
  const onSubmit = async (formData: LoginSchemaType) => {
    setFormState({ isLoading: true, error: "" });
    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setFormState({ isLoading: false, error: "Invalid credentials" });
      } else if (result?.ok) {
        router.push("/pharmacy");
      }
    } catch (ex: unknown) {
      if (ex instanceof Error) {
        setFormState({ ...formState, error: ex.message });
      }
      console.log(ex);
      setFormState({ ...formState, error: "Error occoured logging in" });
    } finally {
      // setFormState({...formState, isLoading: false})
      reset();
    }
  };

  return (
    <div className="grid place-items-center">
      <div className="liquid-glass p-2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="liquid-glass-effect rounded-2xl py-6 px-8 w-sm"
        >
          <h1 className="text-center font-bold text-2xl lg:text-3xl">Login</h1>
          <div className="mt-8 mb-4">
            <label htmlFor="email" className="block">
              Email
            </label>
            <div className="flex items-center gap-2 border rounded py-2 px-4 bg-transparent shadow border-gray-400">
              <Mail size={25} />
              <input
                type="email"
                placeholder="example@email.com"
                {...register("email", { required: true })}
                autoComplete="email"
                className="border-none outline-none w-full"
              />
            </div>
            {errors?.email && (
              <p className="text-red-400 mt-0.5 text-sm">
                {errors.email.message}
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
            {errors?.password && (
              <p className="text-red-400 mt-0.5 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <button className="text-gray-600 cursor-pointer">
              Forgor password
            </button>
          </div>
          <button
            type="submit"
            disabled={formState.isLoading}
            className={`w-full mt-8 cursor-pointer bg-black disabled:bg-gray-800 disabled:animate-pulse hover:bg-black/80 text-white py-2 rounded font-semibold`}
          >
            {formState.isLoading ? (
              <span className="flex justify-center items-center gap-2 ">
                <Spiner color="white" height="size-5" /> Logging in....
              </span>
            ) : (
              <span className="flex items-center gap-2 justify-center">
                <Send size={18} />
                Login
              </span>
            )}
          </button>
          <p className="text-red-400 text-sm h-4 text-center mt-1">
            {formState.error}
          </p>
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
    </div>
  );
}

export default Login;

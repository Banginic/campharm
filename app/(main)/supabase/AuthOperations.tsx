"use client";
import  { supabase } from '../../superbaseClient'
import React, { FormEvent, useState } from "react";

function AuthOperations() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signUpData, setsignUpData] = useState({name:'', email: "", phone:'',  password: "" });
  const [formState, setFormState] = useState<"Login" | "Sign Up">("Login");

  function clearForm(){
    setLoginData({email: '', password: ''})
    setsignUpData({name: '', phone: '', email: '', password: ''})
  }
  function toggleFormState(state: "Login" | "Sign Up") {
      clearForm()
    setFormState(state);
  }
  async function handleFormLogin(e: FormEvent) {
    e.preventDefault();
       const { error } = await supabase.auth.signInWithPassword(loginData)
    if(error){
        console.log('Error signing in', error.message)
    }
  }
  async function handleFormSignUp(e: FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signUp(signUpData)
    if(error){
        console.log('Error signing up', error.message)
    }
  }

  return (
    <div className="min-h-screen grid place-items-center">
      {formState === "Login" ? (
        <form
          onSubmit={handleFormLogin}
          className="border w-sm p-6 border-gray-300 shadow-md"
        >
          <h1 className="text-center font-semibold mb-6 text-lg">{formState}</h1>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              autoComplete="email"
              maxLength={30}
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              placeholder="example@email.com"
              className="border border-gray-300 py-2 px-4 w-full rounded shadow"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              autoComplete="password"
              maxLength={10}
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              placeholder="Enter your password"
              className="border border-gray-300 py-2 px-4 w-full rounded shadow"
            />
          </div>
          <button
            type="submit"
            className="w-full my-4 bg-black text-white py-2 rounded cursor-pointer shadow "
          >
            Login
          </button>
          <div className="flex justify-around text-sm">
            <p>Don't have an account?</p>
            <button
              type="button"
            onClick={() => toggleFormState('Sign Up')}
            className="text-indigo-600 cursor-pointer">Sign up</button>
          </div>
          <div className="flex items-center gap-2">
            <hr className="w-1/2 border-gray-400" />
            <span>Or</span>
            <hr className="w-1/2 border-gray-400" />
          </div>
          <button
            type="button"
            className="w-full  border border-gray-400 hover:border-black py-2 rounded cursor-pointer shadow "
          >
            Login with Google
          </button>
          <button
            type="button"
            className="w-full mt-2 border border-gray-400 hover:border-black py-2 rounded cursor-pointer shadow "
          >
            Login with Apple
          </button>
        </form>
      ) : (
         <form
          onSubmit={handleFormSignUp}
          className="border w-sm p-6 border-gray-300 shadow-md"
        >
          <h1 className="text-center font-semibold mb-6 text-lg">{formState}</h1>
          <div className="mb-4">
            <label htmlFor="fullName" className="block mb-1">
              Full name
            </label>
            <input
              type="text"
              id="fullName"
              required
              autoComplete="name"
              maxLength={30}
              value={signUpData.name}
              onChange={(e) =>
                setsignUpData({ ...signUpData, name: e.target.value })
              }
              placeholder="John Doe"
              className="border border-gray-300 py-2 px-4 w-full rounded shadow"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              autoComplete="email"
              maxLength={30}
              value={signUpData.email}
              onChange={(e) =>
                setsignUpData({ ...signUpData, email: e.target.value })
              }
              placeholder="example@email.com"
              className="border border-gray-300 py-2 px-4 w-full rounded shadow"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block mb-1">
              phone
            </label>
            <input
              type="tel"
              id="phone"
              required
              autoComplete="phone"
              maxLength={15}
              value={signUpData.phone}
              onChange={(e) =>
                setsignUpData({ ...signUpData, phone: e.target.value })
              }
              placeholder="+237 653775159"
              className="border border-gray-300 py-2 px-4 w-full rounded shadow"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              autoComplete="password"
              maxLength={10}
              value={signUpData.password}
              onChange={(e) =>
                setsignUpData({ ...signUpData, password: e.target.value })
              }
              placeholder="Enter your password"
              className="border border-gray-300 py-2 px-4 w-full rounded shadow"
            />
          </div>
          <button
            type="submit"
            className="w-full my-4 bg-black text-white py-2 rounded cursor-pointer shadow "
          >
            Sign Up
          </button>
          <div className="flex justify-around text-sm">
            <p>Already have an account?</p>
            <button
            type="button"
            onClick={() => toggleFormState('Login')}
            className="text-indigo-600 cursor-pointer">Login</button>
          </div>
          <div className="flex items-center gap-2">
            <hr className="w-1/2 border-gray-400" />
            <span>Or</span>
            <hr className="w-1/2 border-gray-400" />
          </div>
          <button
            type="button"
            className="w-full  border border-gray-400 hover:border-black py-2 rounded cursor-pointer shadow "
          >
            Sign up with Google
          </button>
          <button
            type="button"
            className="w-full mt-2 border border-gray-400 hover:border-black py-2 rounded cursor-pointer shadow "
          >
            Sign up with Apple
          </button>
        </form>
      )}
    </div>
  );
}

export default AuthOperations;

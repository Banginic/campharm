"use client";
import React, { useEffect, useState } from "react";
import PharmacyOperations from "./PharmacyOperations";
import AuthOperations from "./AuthOperations";
import { supabase } from "@/app/superbaseClient";
import { Session } from "inspector/promises";

function page() {
  const [session, setSession] = useState<any>(null);

  async function fetchSession() {
    const currentSession = await supabase.auth.getSession();
    setSession(currentSession?.data);
  }
  useEffect(() => {
    fetchSession();
  }, []);
 async function logout(){
  await supabase.auth.signOut()
  setSession(null)
 }
  return <div>{session ? <>
  <button onClick={logout}>Log out</button>
  <PharmacyOperations /></> : <AuthOperations />}</div>;
}

export default page;

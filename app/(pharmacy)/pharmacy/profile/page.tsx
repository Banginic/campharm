import React from "react";
import { ProfileButton } from "@/pharmacy-components/index";
import { useQuery } from "@tanstack/react-query";
import myFetch from "@/libs/myFetch";

async function Profile() {
// function returnFn(){
//   const fetchDetails = {
//     method: 'get',
//     endpoint: '/api/profile',
//     id:'none',
//     body:''
//   }
//   return myFetch(fetchDetails)
// }
// const { isLoading, isError, data, refetch } = useQuery({
//   queryKey: ['profile'],
//   queryFn: returnFn
// })
try{
  const res = await fetch('/api/pharmacy-profile', {
  method: 'GET',
   headers: { "Content-Type": "application/json" },
  credentials:'include'
})
const data = await res.json()
console.log(data)
}
catch(ex){
  console.log(ex)
}
 
  return (
    <div className="max-w-2xl mx-auto relative">
      <h1 className="text-xl font-bold lg:text-3xl text-center">Profile</h1>
      <section className="p-2 liquid-glass mt-8">
        <div className="liquid-glass-effect rounded-xl p-4">
          <p className="text-lg font-semibold text-green-600 mb-2">
            Pharmacy Eden
          </p>
          <p className="text-[16px]">Dr. Nzou Florence</p>
          <p className="text-[16px]">+237 653775159</p>
          <p className="text-[16px]">example@email.com</p>
          <p className="text-[16px]">Douala, Littoral Region</p>
          <p className="text-gray-600 text-[16px]">Since: Monday 05-07-2025</p>
          <ProfileButton />
        </div>
      </section>
     
    </div>
  );
}

export default Profile;

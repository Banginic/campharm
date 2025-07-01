import {
  at,
  direction,
  doctor,
  email,
  location,
  phone,
  verified,
} from "@/assets/photos";
import { PHARMACIES } from "@/assets/data";
import Image from "next/image";
import { Back, WeekDays } from "@/components/index";

async function PharmacyDetails({ params }: { params: Promise<{ pharmacyId: string}>}) {

  const { pharmacyId } = await params
  return (
    <div className="relative">
      <div className="absolute">
        <Back link="/pharmacies"/>
      </div>
      <h1 className="text-xl lg:text-4xl font-bold text-center">
        PHARMACY DETAILS
      </h1>
      <div className="flex gap-4 items-cente flex-col lg:flex-row">
        <section className="mt-8 border border-gray-300 h-66 shadow-md rounded gap-4 p-4 w-sm mx-auto">
          <div className="flex items-center gap-4">
            <Image
              src={verified}
              alt="./placeholder.png"
              width={25}
              height={25}
            />
            <p className="text-lg lg:text-2xl font-bold">Karen Pharmacy</p>
          </div>
          <div className="mt-4 text-gray-900">
            <div className="flex items-center gap-4 mb-1">
              <Image
                src={doctor}
                alt="./placeholder.png"
                width={20}
                height={20}
              />
              <p className="">Dr. Manjon Ngwanyam</p>
            </div>
            <div className="flex items-center gap-4 mb-1">
              <Image
                src={phone}
                alt="./placeholder.png"
                width={20}
                height={20}
              />
              <p className="">+237 653 775 159</p>
            </div>
            <div className="flex items-center gap-4 mb-1">
              <Image
                src={email}
                alt="./placeholder.png"
                width={20}
                height={20}
              />
              <p className="">contact@email.com</p>
            </div>
            <div className="flex items-center gap-4 mb-1">
              <Image
                src={location}
                alt="./placeholder.png"
                width={20}
                height={20}
              />
              <p className="">Douala, Littoral</p>
            </div>
          </div>
          <button className="flex items-center gap-4 hover:bg-green-950 bg-green-900 text-white px-4 py-2 rounded w-full justify-center mt-4 cursor-pointer">
            <Image
              src={direction}
              alt="./placeholder.png"
              width={25}
              height={25}
            />
            <p>Direction</p>
          </button>
        </section>
        <WeekDays />
      </div>
    </div>
  );
}

export default PharmacyDetails;

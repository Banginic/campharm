import React from "react";
import Image from "next/image";
import { twitter, instagram, facebook, banginic_logo } from "@/assets/photos";
import { MY_DATA } from "@/assets/data";

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white/50 backdrop-blur-sm rounded-tl-2xl px-4 py-6 rounded-tr-2xl">
      <div className="flex items-center justify-betwee gap-2 ml-4 lg:ml-0">
        <a href={MY_DATA.socialLinks.twitter} target="blank">
          <Image src={twitter} width={30} height={30} alt="" />
        </a>
        <a href={MY_DATA.socialLinks.facebook} target="blank">
          <Image src={facebook} width={30} height={30} alt="" />
        </a>
        <a href={MY_DATA.socialLinks.instagram} target="blank">
          <Image src={instagram} width={30} height={30} alt="" />
        </a>
      </div>
      <div className="mt-4">
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} {MY_DATA.appName}. Making
            healthcare accessible to everyone.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-900 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex-col md:flex-row gap-2 flex justify-between  py-4">
        <div className="flex items-center gap-4 text-sm text-neutral-600  mx-auto">
          Product of
          <a
            href={MY_DATA.developer_link}
            target="blank"
            className="flex items-center gap-1 cursor-pointer"
          >
            <Image src={banginic_logo} width={20} alt={"./placeholder.png"} />

            <p>Banginic</p>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

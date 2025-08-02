import React from "react";
import Image from "next/image";
import { twitter, instagram, facebook, banginic_logo } from "@/assets/photos";
import { MY_DATA } from "@/assets/data";

function Footer() {
  return (
    <footer className="p-4 border liquid-glass-effect rounded-tl-2xl rounded-tr-2xl">
      <div className="flex items-center justify-betwee gap-2">
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
      <section className="mt-8 text-[18px] text-neutral-600">
        <p>Blogs</p>
        <p>Resources</p>
        <p>Privacy Policy</p>
      </section>
      <div className="container mx-auto flex-col md:flex-row gap-2 flex justify-between  py-4">
        <p className="text-sm text-neutral-600">
          &copy; {new Date().getFullYear()} {MY_DATA.appName}. All rights
          reserved.
        </p>
        <div className="flex items-center gap-4 text-sm text-neutral-600 pr-8">
          Product of
          <a
            href={MY_DATA.developer_link}
            target="blank"
            className="flex items-center gap-1 cursor-pointer"
          >
            <Image
              src={banginic_logo}
              width={20}
              alt={"./placeholder.png"}
            />

            <p>Banginic</p>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

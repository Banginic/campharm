import Link from "next/link";
import Image from "next/image";
import { back } from "@/assets/photos";

function Back({ link }: { link: string }) {
  return (
    <Link href={link} className="lg:hidden">
      <Image src={back} width={30} height={20} alt="./placeholder.png" />
    </Link>
  );
}

export default Back;

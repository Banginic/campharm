import React from "react";

export default function Title({ text }: { text: string }) {
  return <h1 className="text-center text-green-950 font-bold text-xl lg:text-2xl">{text}</h1>;
}

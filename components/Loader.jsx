import React from "react";
import Image from "next/image";

export default function Loader() {
  return (
    <div className='w-screen h-screen fixed z-20 bg-black/10 backdrop-blur-sm flex justify-center items-center '>
      <div className='p-4 bg-primary/25 animate-bounce relative rounded-full flex justify-center items-center'>
        <Image src='/logo.svg' width={50} height={50} />
      </div>
    </div>
  );
}

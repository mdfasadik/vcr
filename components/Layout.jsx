import Head from "next/head";
import React from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";

import { MdBrightness4, MdBrightness6, MdDashboard } from "react-icons/md";

export default function Layout({ children, title }) {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <nav className='w-screen h-20 flex justify-between items-center fixed px-6 bg-gray-100 dark:bg-darkBody border-b dark:border-b-gray-700'>
        <Link href={"/"} passHref>
          <a className=''>
            <Image src='/logo.svg' width={56} height={56} />
          </a>
        </Link>
        <Link href='/login' passHref>
          <button className='text-2xl bg-primary p-4 rounded-full shadow-lg shadow-primary text-white'>
            <MdDashboard />
          </button>
        </Link>
      </nav>

      <button
        className='text-4xl bg-white dark:bg-primary-dark p-3 rounded-full shadow-xl text-gray-700 dark:text-white fixed z-20 bottom-10 right-6'
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {theme === "dark" ? <MdBrightness4 /> : <MdBrightness6 />}
      </button>

      <div className='container pt-28 px-6 pb-6 mx-auto'>{children}</div>
    </>
  );
}

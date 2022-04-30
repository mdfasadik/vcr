import React, { useState } from "react";
import Layout from "../../components/Layout";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Link from "next/link";

import http from "../../services/httpService";

export default function index() {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const api = process.env.NEXT_PUBLIC_API;
    setLoading(true);
    const response = await http.post(api + "auth", data);
    setLoading(false);

    if (response.path) {
      Cookies.set("devKey", response.role);
      router.replace(response.path);
    } else {
      toast.error(response.message);
    }
  };
  return (
    <Layout title={"Login"}>
      <div className='text-sm font-medium mb-8 flex gap-2 cursor-pointer'>
        <Link href={"/"} passHref>
          <p>Home</p>
        </Link>
        <p>{">"}</p>
        <Link href={"/login"} passHref>
          <p>Login</p>
        </Link>
      </div>
      <h1 className='text-xl font-medium'>Enter the Secret Key</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full mt-6'>
        <input
          type={showPass ? "text" : "password"}
          className='w-full rounded-lg border border-gray-500 p-2 focus:outline-primary'
          {...register("secretKey")}
        />
        <div className='flex gap-2 items-center mt-4'>
          <input
            type={"checkbox"}
            className='accent-primary'
            onClick={() => setShowPass(!showPass)}
          />
          <p className='font-medium text-sm'>Show Secret Key</p>
        </div>
        <button className='bg-primary text-white w-full font-medium text-center p-2 rounded-lg mt-4'>
          {loading ? "Verifying..." : "Login"}
        </button>
      </form>
      <div className='relative w-full h-[400px] md:mt-8'>
        <Image src={"/login.svg"} layout='fill' priority></Image>
      </div>
    </Layout>
  );
}

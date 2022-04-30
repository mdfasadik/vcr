import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import http from "../services/httpService";

export default function SecretKeyModal({
  defaultValue,
  showSecretKeyModal,
  devId,
}) {
  const [loading, isLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      devSecretKey: defaultValue.devSecretKey,
      crSecretKey: defaultValue.crSecretKey,
    },
  });

  const onSubmit = async (data) => {
    isLoading(true);
    const res = await http.put(
      process.env.NEXT_PUBLIC_API + "dev/" + devId,
      data
    );
    if (res.data) {
      toast.success(res.message);
      showSecretKeyModal(false);
      setTimeout(() => {
        router.reload();
      }, 500);
    } else {
      toast.error(res.message);
    }
    isLoading(false);
  };

  return (
    <div className='w-screen h-screen fixed z-30 bg-black/50 backdrop-blur-sm p-4'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full mx-auto bg-white dark:bg-primary-dark rounded-lg p-4 mt-10'>
        <div className='flex flex-col gap-4 mb-8'>
          <div>
            <h1 className='text-lg font-medium mb-4'>Dev Secret Key</h1>
            <input
              type='text'
              {...register("devSecretKey")}
              className='w-full rounded-lg border border-gray-500 p-2 focus:outline-primary'
            />
          </div>
          <div>
            <h1 className='text-lg font-medium mb-4'>CR Secret Key</h1>
            <input
              type='text'
              {...register("crSecretKey")}
              className='w-full rounded-lg border border-gray-500 p-2 focus:outline-primary'
            />
          </div>
        </div>
        <div className='flex gap-2 items-center'>
          <button type='submit' className='btn'>
            {loading ? "Updating..." : "Update"}
          </button>
          <div
            onClick={() => showSecretKeyModal(false)}
            className='btn dark:bg-gray-200 dark:text-gray-700 bg-gray-300 text-gray-700 cursor-pointer'>
            Cancel
          </div>
        </div>
      </form>
    </div>
  );
}

import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import http from "../services/httpService";

export default function DeleteModal({ showDeleteModal, noticeId }) {
  const router = useRouter();

  const handleNoticeDelete = async () => {
    const res = await http.del(
      process.env.NEXT_PUBLIC_API + "notice/" + noticeId
    );

    if (res.isDeleted) {
      toast.success(res.message);
      router.replace("/dashboard");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className='w-screen h-screen bg-black/50 backdrop-blur-sm p-4 fixed z-40'>
      <div className='w-full p-4 bg-white dark:bg-primary-dark mx-auto mt-20 rounded-lg'>
        <h1 className='font-medium text-lg'>
          Do you want to delete this Notice ?
        </h1>
        <div className='flex gap-2 mt-6'>
          <button onClick={handleNoticeDelete} className='btn bg-red-600'>
            Delete
          </button>
          <button
            onClick={() => showDeleteModal(false)}
            className='btn-secondary'>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Image from "next/image";
import { RiEditBoxLine } from "react-icons/ri";

export default function NoticeList({ notice, editable }) {
  if (notice.category === "important")
    return (
      <>
        <div className='flex p-2 w-full rounded-lg justify-between bg-green-100 border border-green-600 gap-2 mb-2'>
          <div className='w-14 relative'>
            <Image src={"/important.svg"} layout='fill' />
          </div>
          <div className='flex flex-col justify-between w-full'>
            <div className='w-full flex justify-between'>
              <h1 className='font-medium text-sm text-green-600'>
                {notice.title}
              </h1>
              {editable && (
                <button className='text-green-600 text-2xl'>
                  <RiEditBoxLine />
                </button>
              )}
            </div>
            <div className='w-full flex justify-between text-sm'>
              <h1 className='font-medium text-sm text-green-400'>
                {"Updated : " + new Date(notice.date).toDateString()}
              </h1>
            </div>
          </div>
        </div>
      </>
    );
  if (notice.category === "reminder")
    return (
      <>
        <div className='flex p-2 w-full rounded-lg justify-between bg-blue-100 dark:bg-blue-200 border border-blue-600 gap-2 mb-2'>
          <div className='w-14 relative'>
            <Image src={"/reminder.svg"} layout='fill' />
          </div>
          <div className='flex flex-col justify-between w-full'>
            <div className='w-full flex justify-between'>
              <h1 className='font-medium text-sm text-blue-600'>
                {notice.title}
              </h1>
              {editable && (
                <button className='text-blue-600 text-2xl'>
                  <RiEditBoxLine />
                </button>
              )}
            </div>
            <div className='w-full flex justify-between text-sm'>
              <h1 className='font-medium text-sm text-blue-400'>
                {"Updated : " + new Date(notice.date).toDateString()}
              </h1>
            </div>
          </div>
        </div>
      </>
    );
  if (notice.category === "info")
    return (
      <>
        <div className='flex p-2 w-full rounded-lg justify-between bg-yellow-200 border border-yellow-600 gap-2 mb-2'>
          <div className='w-14 relative'>
            <Image src={"/info.svg"} layout='fill' />
          </div>
          <div className='flex flex-col justify-between w-full'>
            <div className='w-full flex justify-between'>
              <h1 className='font-medium text-sm text-yellow-600'>
                {notice.title}
              </h1>
              {editable && (
                <button className='text-yellow-600 text-2xl'>
                  <RiEditBoxLine />
                </button>
              )}
            </div>
            <div className='w-full flex justify-between text-sm'>
              <h1 className='font-medium text-sm text-yellow-500'>
                {"Updated : " + new Date(notice.date).toDateString()}
              </h1>
            </div>
          </div>
        </div>
      </>
    );
  if (notice.category === "event")
    return (
      <>
        <div className='flex p-2 w-full rounded-lg justify-between bg-gray-200 dark:bg-gray-300 border border-gray-600 gap-2 mb-2'>
          <div className='w-14 relative'>
            <Image src={"/event.svg"} layout='fill' />
          </div>
          <div className='flex flex-col justify-between w-full'>
            <div className='w-full flex justify-between'>
              <h1 className='font-medium text-sm text-gray-600'>
                {notice.title}
              </h1>
              {editable && (
                <button className='text-gray-600 text-2xl'>
                  <RiEditBoxLine />
                </button>
              )}
            </div>
            <div className='w-full flex justify-between text-sm'>
              <h1 className='font-medium text-sm text-gray-400'>
                {"Updated : " + new Date(notice.date).toDateString()}
              </h1>
            </div>
          </div>
        </div>
      </>
    );
}

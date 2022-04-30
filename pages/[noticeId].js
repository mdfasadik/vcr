import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";

import http from "../services/httpService";

export default function NoticeDetails({ notice }) {
  return (
    <>
      <Layout title={"Notice Details"}>
        <div className='text-sm font-medium mb-8 flex gap-2 cursor-pointer'>
          <Link href={"/"} passHref>
            <p>Home</p>
          </Link>
          <p>{">"}</p>
          <p className='text-center'>Notice</p>
        </div>
        {!notice.data && notice.message && (
          <h1 className='text-center font-medium text-lg text-red-600 mt-10 p-3 bg-red-100 rounded-md border-red-600'>
            {notice.message}
          </h1>
        )}
        {notice.data && (
          <>
            <h1 className='text-2xl font-medium mb-2'>{notice.data.title}</h1>
            <p className='text-gray-500 dark:text-gray-400 text-lg'>
              Published By :{" "}
              <span className='inline font-medium'>{notice.data.postedBy}</span>
            </p>
            <p className='text-gray-400 italic'>
              Updated : {new Date(notice.data.date).toDateString()}
            </p>
            <p className='my-6 '>{notice.data.desc}</p>
            {notice.data.supportingLinks.length > 0 && (
              <ul>
                <p className='font-medium text-lg'>Here are the links : </p>
                {notice.data.supportingLinks.map((link) => (
                  <a
                    href={link.link}
                    target='_blank'
                    key={link._id}
                    className='text-primary underline font-medium text-lg'>
                    {link.label}
                  </a>
                ))}
              </ul>
            )}
          </>
        )}
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const notice = await http.get(
    process.env.NEXT_PUBLIC_API + "notice/" + context.query.noticeId
  );
  return {
    props: {
      notice,
    },
  };
}

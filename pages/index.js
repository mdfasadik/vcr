import React, { useState } from "react";
import Link from "next/link";

import Layout from "../components/Layout";
import http from "../services/httpService";
import NoticeList from "../components/NoticeList";

export default function Dashboard({ notices, filterredNotice }) {
  const [selectedNotices, setSelectedNotices] = useState(filterredNotice);
  const [section, setSection] = useState("A");

  const handleFilterNotice = (sec) => {
    setSection(sec);
    if (!selectedNotices) return;
    const filterredNotices = notices?.data.filter(
      (notice) => notice.section === sec
    );
    setSelectedNotices(filterredNotices);
  };

  return (
    <Layout title={"Home"}>
      {" "}
      <h1 className='font-medium mb-4'>Published Notices</h1>
      <div className='flex gap-2 mb-6'>
        <button
          className={section === "A" ? "btn" : "btn-secondary"}
          onClick={() => handleFilterNotice("A")}>
          Sec A
        </button>
        <button
          className={section === "B" ? "btn" : "btn-secondary"}
          onClick={() => handleFilterNotice("B")}>
          Sec B
        </button>
        <button
          className={section === "C" ? "btn" : "btn-secondary"}
          onClick={() => handleFilterNotice("C")}>
          Sec C
        </button>
      </div>
      {notices.message && (
        <h1 className='text-center text-gray-400 dark:text-gray-500 mt-6'>
          {notices.message}
        </h1>
      )}
      {selectedNotices?.length === 0 && (
        <h1 className='text-center text-gray-400 dark:text-gray-500 mt-6'>
          No new Notice
        </h1>
      )}
      {selectedNotices?.length > 0 && (
        <>
          {selectedNotices.map((notice) => (
            <Link href={"/" + notice._id} passHref key={notice._id}>
              <a>
                <NoticeList notice={notice} editable={false} />
              </a>
            </Link>
          ))}
        </>
      )}
      {}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  let notices = await http.get(process.env.NEXT_PUBLIC_API + "notice");
  let filterredNotice = notices.data?.filter(
    (notice) => notice.section === "A"
  );
  if (filterredNotice?.length === 0) filterredNotice = notices;
  return {
    props: {
      notices: notices || null,
      filterredNotice: filterredNotice || null,
    },
  };
}

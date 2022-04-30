import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import http from "../../services/httpService";
import Layout from "../../components/Layout";
import EditNoiceForm from "../../components/EditNotice";
import DeleteModal from "../../components/DeleteModal";

export default function EditNotice({ devKey, notice }) {
  const [deleteModal, showDeleteModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!devKey || devKey !== "cr") router.replace("/login");
  }, []);

  return (
    <>
      {deleteModal && (
        <DeleteModal
          showDeleteModal={showDeleteModal}
          noticeId={notice?.data?._id}
        />
      )}
      <Layout title={"Edit Notice"}>
        {!notice.data && notice.message && (
          <h1 className='text-center font-medium text-lg text-red-600 mt-10 p-3 bg-red-100 rounded-md border-red-600'>
            {notice.message}
          </h1>
        )}
        {notice.data && (
          <EditNoiceForm
            defaultValue={notice?.data}
            showDeleteModal={showDeleteModal}
          />
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
      devKey: context.req.cookies["devKey"] || null,
      notice,
    },
  };
}

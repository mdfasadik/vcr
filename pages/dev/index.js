import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import Cookis from "js-cookie";

import http from "../../services/httpService";
import SecretKeyModal from "../../components/SecretKeyModal";

export default function Dev({ devKey, devs }) {
  const router = useRouter();
  const [secretKeyModal, showSecretKeyModal] = useState(false);

  useEffect(() => {
    if (!devKey || devKey !== "dev") router.replace("/login");
  }, []);

  return (
    <>
      {secretKeyModal && (
        <SecretKeyModal
          defaultValue={devs.data[0]}
          showSecretKeyModal={showSecretKeyModal}
          devId={devs.data[0]._id}
        />
      )}
      <Layout title={"Dev"}>
        <div className='text-sm font-medium mb-8 flex gap-2 cursor-pointer'>
          <Link href={"/"} passHref>
            <p>Home</p>
          </Link>
          <p>{">"}</p>
          <Link href={"/dev"} passHref>
            <p className='text-center'>Devs</p>
          </Link>
        </div>
        <h1 className='text-center'>{!devs.data && devs.message}</h1>
        {devs.data && (
          <>
            <div className='flex gap-2 flex-wrap text-sm mb-8'>
              <button
                onClick={() => showSecretKeyModal(true)}
                className='rounded-full px-4 py-2 text-white bg-red-600 font-medium'>
                Show Secret Keys
              </button>
            </div>
            <h1 className='font-medium mb-4'>Notice Categories :</h1>
            {devs.data[0].categories.map((category) => (
              <li key={category._id} className='capitalize'>
                {category.category}
              </li>
            ))}
          </>
        )}
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const devs = await http.get(process.env.NEXT_PUBLIC_API + "dev");
  return {
    props: {
      devKey: context.req.cookies["devKey"] || null,
      devs,
    },
  };
}

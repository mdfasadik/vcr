import React, { useEffect, useRef, useState } from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FiLink } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { toast } from "react-toastify";

import http from "../../services/httpService";

export default function New({ devKey }) {
  const [category, setCategory] = useState("");
  const [selectedSec, setSelectedSec] = useState("");
  const [showLink, setShowLink] = useState(false);
  const [supportingLinks, setSupportingLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const addressRef = useRef(null);
  const labelRef = useRef(null);

  const schema = Joi.object({
    section: Joi.string().min(1).max(1).required().label("Section"),
    title: Joi.string().min(3).max(255).required().label("Title"),
    desc: Joi.optional().label("Description"),
    postedBy: Joi.string().min(3).max(20).required().label("Posted By"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });
  const router = useRouter();

  useEffect(() => {
    if (!devKey || devKey !== "cr") router.replace("/login");
  }, []);
  const handleShowLinks = () => {
    if (showLink === false) setSupportingLinks([]);
    setShowLink(!showLink);
  };
  const handleSupportingLinks = () => {
    const addedLinks = [...supportingLinks];
    const newLink = {
      link: addressRef.current.value,
      label: labelRef.current.value,
    };
    addedLinks.push(newLink);
    setSupportingLinks(addedLinks);
  };

  const handleLinkDelete = (index) => {
    const addedLinks = [...supportingLinks];
    const filtered = addedLinks.filter((link, i) => i !== index);
    setSupportingLinks(filtered);
  };

  const onSubmit = async (data) => {
    if (!showLink) {
      supportingLinks = [];
    }
    const payload = { ...data, category, supportingLinks };
    const res = await http.post(
      process.env.NEXT_PUBLIC_API + "notice",
      payload
    );
    if (res.data) {
      toast.success(res.message);
      router.replace("/dashboard");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <>
      <Layout title={"New notice"}>
        <div className='text-sm font-medium mb-8 flex gap-2 cursor-pointer'>
          <Link href={"/"} passHref>
            <p>Home</p>
          </Link>
          <p>{">"}</p>
          <Link href={"/dashboard"} passHref>
            <p className='text-center'>Dashboard</p>
          </Link>
          <p>{">"}</p>
          <Link href={"/new"} passHref>
            <p className='text-center'>New notice</p>
          </Link>
        </div>

        <h1 className='font-medium text-lg mb-4'>Choose Category :</h1>
        <div className='flex gap-2 mb-4'>
          {["reminder", "important", "info", "event"].map((cat, i) => (
            <button
              key={i}
              onClick={() => setCategory(cat)}
              className={`${cat} badge capitalize text-sm font-medium`}>
              {cat}
            </button>
          ))}
        </div>

        <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='sec' className='font-medium text-lg'>
            {" "}
            Choose Section :
          </label>
          <select
            {...register("section")}
            onChange={(e) => setSelectedSec(e.target.value)}
            required
            id='sec'
            className='w-full accent-primary p-2 my-4 rounded-md border border-gray-500 focus:outline-primary'>
            <option>Choose Section</option>
            {["A", "B", "C"].map((sec, i) => (
              <option key={i} value={sec}>
                {sec}
              </option>
            ))}
          </select>
          {errors.section && (
            <div className='w-full p-3 text-center text-red-600 bg-red-200 border dark:bg-red-300 border-red-600 rounded-md font-medium mb-2'>
              {errors.section.message}
            </div>
          )}
          <h2 className='font-medium text-lg'>
            {" "}
            Create Notice :{" "}
            <span className='inline text-sm capitalize'>
              ( Category : {category} | Section : {selectedSec} )
            </span>
          </h2>
          <input
            {...register("title")}
            required
            className={
              "w-full accent-primary p-2 my-2 rounded-md border border-gray-500 focus:outline-primary placeholder-gray-500 dark:placeholder-inherit"
            }
            placeholder='Add title'
          />
          {errors.title && (
            <div className='w-full p-3 text-center text-red-600 bg-red-200 border dark:bg-red-300 border-red-600 rounded-md font-medium mb-2'>
              {errors.title.message}
            </div>
          )}
          <textarea
            rows={5}
            {...register("desc")}
            className='w-full accent-primary p-2 rounded-md border border-gray-500 focus:outline-primary placeholder-gray-500 dark:placeholder-inherit'
            placeholder='Description (optional)'
          />
          {errors.desc && (
            <div className='w-full p-3 text-center text-red-600 bg-red-200 border dark:bg-red-300 border-red-600 rounded-md font-medium mb-2'>
              {errors.desc.message}
            </div>
          )}
          <div className='my-2 flex gap-3 items-center w-full'>
            <input
              type={"checkbox"}
              className='accent-primary rounded-lg'
              onClick={handleShowLinks}
            />
            <h2 className='font-medium'>Add supporting link</h2>
          </div>
          {showLink && (
            <>
              <div className='flex gap-2 items-center'>
                <input
                  ref={addressRef}
                  placeholder='Link Adress'
                  className='w-full accent-primary p-2 rounded-md border border-gray-500 focus:outline-primary placeholder-gray-500 dark:placeholder-inherit'
                />
                <input
                  ref={labelRef}
                  placeholder='Link Label'
                  className='w-full accent-primary p-2 rounded-md border border-gray-500 focus:outline-primary placeholder-gray-500 dark:placeholder-inherit'
                />
                <div
                  className='btn flex items-center gap-2 cursor-pointer'
                  onClick={handleSupportingLinks}>
                  <FiLink /> Add
                </div>
              </div>
              {supportingLinks &&
                supportingLinks?.map((links, i) => (
                  <div
                    key={i}
                    className='mt-2 bg-white dark:bg-gray-100 p-3 rounded-md'>
                    <div className='flex justify-between w-full items-center'>
                      <a
                        href={links.link}
                        target='_blank'
                        rel='noreferrer'
                        className='text-primary font-medium text-lg underline'>
                        {links.label}
                      </a>
                      <div
                        className='cursor-pointer text-red-600'
                        onClick={() => handleLinkDelete(i)}>
                        <ImCross />
                      </div>
                    </div>
                  </div>
                ))}
            </>
          )}
          <h2 className='font-medium mt-4'> Your Name :</h2>
          <input
            {...register("postedBy")}
            required
            className='w-full accent-primary p-2 my-2 rounded-md border border-gray-500 focus:outline-primary placeholder-gray-500 dark:placeholder-inherit'
            placeholder='Posted By'
          />
          {errors.postedBy && (
            <div className='w-full p-3 text-center text-red-600 bg-red-200 border dark:bg-red-300 border-red-600 rounded-md font-medium mb-2'>
              {errors.postedBy.message}
            </div>
          )}
          <input
            type={"submit"}
            value={loading ? "Publishing..." : "Publish"}
            className='btn mt-4 w-full cursor-pointer'
          />
        </form>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      devKey: context.req.cookies["devKey"] || null,
    },
  };
}

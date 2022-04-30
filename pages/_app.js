import { useState } from "react";
import dynamic from "next/dynamic";
import Router from "next/router";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import Loader from "../components/Loader";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  Router.events.on("routeChangeStart", (url) => {
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false);
  });
  return (
    <>
      {loading && <Loader />}
      <ToastContainer autoClose={1500} draggable={true} />
      <ThemeProvider attribute='class'>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default dynamic(() => Promise.resolve(MyApp), { ssr: false });

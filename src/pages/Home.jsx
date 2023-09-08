import React from "react";
import { Link, Navigate } from "react-router-dom";
import Footer from "../components/layout/Footer";

const Home = () => {
  return (
    <main
      className={`grid grid-rows-[1fr_auto] min-h-screen bg-[url("/logo/to-connect-logo.svg")] bg-center bg-cover `}
    >
      {/* Sección Superior */}
      <section className="flex flex-col justify-center items-center px-4 gap-6 text-center">
        <div></div>
        <section className="grid gap-3 ">
          <h1 className="text-txt_black font-bold text-4xl">App To Connect </h1>
          <p className="text-txt_black text-2xl font-bold ">Welcome</p>
          <section className="flex justify-center gap-5">
            <Link
              to={"/login"}
              className="bg-slate-500 text-white font-semibold p-2 rounded-lg border-2 border-slate-500 hover:bg-white  duration-1000 hover:text-slate-500 transition-colors"
            >
              Login
            </Link>
            <Link
              to={"/signup"}
              className="bg-slate-500 text-white font-semibold p-2 rounded-lg border-2 border-slate-500 hover:bg-white  duration-1000 hover:text-slate-500 transition-colors"
            >
              Register
            </Link>
          </section>
        </section>
      </section>
      <Footer />
    </main>
  );
};

export default Home;

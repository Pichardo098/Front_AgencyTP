import React from "react";
import { Link, Navigate } from "react-router-dom";

const Home = () => {
  return (
    <main className="grid grid-rows-[1fr_auto] min-h-screen bg-bkg_white dark:bg-dk_bg">
      {/* Sección Superior */}
      <section className="flex flex-col justify-center items-center px-4 gap-6 text-center">
        <div></div>
        <section>
          <h1 className="text-txt_red font-bold text-3xl">App To Connect </h1>
          <p className="text-txt_black text-xl font-semibold dark:text-bkg_white">
            Welcome
          </p>
          <Link to={"/login"}>Login</Link>
          <Link to={"/signup"}>Register</Link>
        </section>
      </section>
    </main>
  );
};

export default Home;

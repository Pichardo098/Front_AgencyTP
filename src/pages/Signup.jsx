import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { axiosAgencyTp } from "../utils/configureAxios";
import { loginUser } from "../store/slices/userInfo.slice";
import Footer from "../components/layout/Footer";

const opciones = [
  { label: "Jr Executive", value: "jr executive" },
  { label: "Sr Executive", value: "sr executive" },
  { label: "Supervisor", value: "supervisor" },
];

const Signup = () => {
  const { token } = useSelector((store) => store.userInfo);
  const { register, handleSubmit, reset, control } = useForm();
  const dispatch = useDispatch();

  const submit = (dataRegisterUser) => {
    axiosAgencyTp
      .post("/users/signup", dataRegisterUser)
      .then(() => {
        const dataLogin = {
          email: dataRegisterUser.email,
          password: dataRegisterUser.password,
        };
        window.alert("Cuenta creada con éxito");
        dispatch(loginUser(dataLogin));
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="flex flex-col min-h-screen justify-between bg-gray-200 text-black ">
      <header className="h-[50px]">
        {token ? (
          <Navigate to="/principalView" />
        ) : (
          <nav className="h-full flex justify-between text-center items-center px-2">
            <h1>App To Connect</h1>
          </nav>
        )}
      </header>
      {token ? (
        <Navigate to="/principalView" />
      ) : (
        <form
          onSubmit={handleSubmit(submit)}
          className="p-5 mx-auto bg-white rounded-lg w-[350px] flex flex-col gap-6 my-8"
        >
          <h3 className="font-bold text-2xl mt-2">Sign Up</h3>
          {/* First Name */}
          <div className="grid gap-3">
            <label className="text-sm font-semibold">First Name:</label>
            <input
              required
              {...register("first_name")}
              className="border-2 rounded-md outline-none p-2"
              type="text"
              id="first_name"
            />
          </div>
          {/* Last Name */}
          <div className="grid gap-3">
            <label className="text-sm font-semibold">Last Name:</label>
            <input
              required
              {...register("last_name")}
              className="border-2 rounded-md outline-none p-2"
              type="text"
              id="last_name"
            />
          </div>
          {/* Email */}
          <div className="grid gap-3">
            <label className="text-sm font-semibold">Email:</label>
            <input
              required
              {...register("email")}
              className="border-2 rounded-md outline-none p-2"
              type="email"
              id="email"
            />
          </div>
          {/* Password */}
          <div className="grid gap-3">
            <label className="text-sm font-semibold">Password:</label>
            <input
              required
              {...register("password")}
              className="border-2 rounded-md outline-none p-2"
              type="password"
              id="password"
            />
          </div>
          {/* Description */}
          <div className="grid gap-3">
            <label className="text-sm font-semibold">Description:</label>
            <input
              {...register("description")}
              className="border-2 rounded-md outline-none p-2"
              type="text"
              id="description"
            />
          </div>
          {/* Role */}
          <div className="grid gap-3">
            <label className="text-sm font-semibold">Role:</label>
            <Controller
              name="role"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <select {...field}>
                  {opciones.map((opcion) => (
                    <option key={opcion.value} value={opcion.value}>
                      {opcion.label}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>
          {/* Img */}
          <div className="grid gap-3">
            <label className="text-sm font-semibold" htmlFor="password">
              Profile Image:
            </label>
            <input
              {...register("profileImgUrl")}
              className="border-2 rounded-md outline-none p-2"
              type="file"
              id="profileImg"
            />
          </div>

          <button className="text-white bg-red-600 p-2 mt-3 hover:bg-red-500 transition-colors">
            Sign up
          </button>

          <p className="text-start py-3">
            Already have an account?
            <Link
              to="/login"
              className="text-blue-600 underline hover:no-underline"
            >
              Log in
            </Link>
          </p>
        </form>
      )}
      <Footer />
    </section>
  );
};

export default Signup;

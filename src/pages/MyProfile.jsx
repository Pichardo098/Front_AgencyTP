import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { axiosAgencyTp, getConfig } from "../utils/configureAxios";
import Load from "../components/layout/Load";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/userInfo.slice";
import { useForm } from "react-hook-form";

const MyProfile = () => {
  const { token, user: userStore } = useSelector((store) => store.userInfo);
  const { register, handleSubmit, reset, control } = useForm();
  const [user, setUser] = useState(null);
  const [update, setUpdate] = useState(false);
  const dispatch = useDispatch();

  const submit = (dataRegisterUser) => {
    const url = `/users/${user?._id}`;

    axiosAgencyTp
      .patch(url, dataRegisterUser, getConfig())
      .then(() => {
        window.alert("Datos actualizados con exito");
        setUpdate(false);
        dispatch(logout());
      })
      .catch((err) => {
        window.alert(err.response.data.message);
      });
  };

  const handleDelete = () => {
    const url = `/users/${userStore.id}`;

    axiosAgencyTp
      .delete(url, getConfig())
      .then(({ data }) => {
        window.alert(data.message);
        dispatch(logout());
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = () => {
    setUpdate(!update);
  };

  const handleLogOut = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const url = "/users/myProfile";

    axiosAgencyTp
      .get(url, getConfig())
      .then(({ data }) => setUser(data?.user))
      .catch((err) => {
        if (err.response.data.message == "jwt expired") {
          window.alert("Please login again");
          dispatch(logout());
        }
      });
  }, [userStore]);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white text-gray-400 items-center ">
      <Header />
      <section className="relative">
        <section className="fixed top-[50px] ">
          <button>{"<"}</button>
          <button onClick={handleLogOut} className="bg-red-300">
            Log Out
          </button>
        </section>

        {/* Information card */}
        <article className="max-w-[1000px]  bg-gray  rounded-md shadow-lg shadow-gray-500 mx-4  lg:mx-auto">
          {update ? (
            <section className="flex flex-col justify-center gap-5">
              {/* User image */}
              <section
                className={`relative h-40 rounded-t-lg flex justify-center`}
              >
                <div className="rounded-lg absolute px-8 bottom-0 max-w-[300px] mx-auto ">
                  {user?.profile_img ? (
                    <img
                      className="rounded-full shadow-lg shadow-black"
                      src={user?.profile_img}
                      alt={user?.first_name}
                    />
                  ) : (
                    <Load />
                  )}
                </div>
              </section>
              {/* Content card */}
              <form
                onSubmit={handleSubmit(submit)}
                className="flex flex-col justify-center items-center my-6 text-center gap-3"
              >
                {/* First Name */}
                <div className="flex flex-row items-center gap-2">
                  <label className="text-sm font-semibold">First Name:</label>
                  <input
                    required
                    {...register("first_name")}
                    className="border-2 rounded-md outline-none p-2"
                    type="text"
                    id="first_name"
                    placeholder={user.first_name}
                  />
                </div>
                {/* Last Name */}
                <div className="flex flex-row items-center gap-2">
                  <label className="text-sm font-semibold">Last Name:</label>
                  <input
                    required
                    {...register("last_name")}
                    className="border-2 rounded-md outline-none p-2"
                    type="text"
                    id="last_name"
                    placeholder={user.last_name}
                  />
                </div>
                {/* Current Password */}
                <div className="flex flex-row items-center gap-2">
                  <label className="text-sm font-semibold">
                    Curr. password:
                  </label>
                  <input
                    required
                    {...register("currentPassword")}
                    className="border-2 rounded-md outline-none p-2"
                    type="password"
                    id="currentPassword"
                  />
                </div>
                {/* New Password */}
                <div className="flex flex-row items-center gap-2">
                  <label className="text-sm font-semibold">New password:</label>
                  <input
                    required
                    {...register("newPassword")}
                    className="border-2 rounded-md outline-none p-2"
                    type="password"
                    id="newPassword"
                  />
                </div>
                {/* Description */}
                <div className="flex flex-row items-center gap-2">
                  <label className="text-sm font-semibold">Description:</label>
                  <input
                    {...register("description")}
                    className="border-2 rounded-md outline-none p-2"
                    type="text"
                    id="description"
                  />
                </div>
                {/* Img */}
                <div className="flex flex-row items-center gap-2">
                  <label className="text-sm font-semibold">
                    Profile Image:
                  </label>
                  <input
                    {...register("profileImgUrl")}
                    className="border-2 rounded-md outline-none p-2 max-w-[170px]"
                    type="file"
                    id="profileImg"
                  />
                </div>

                <section>
                  <button className="text-white bg-red-600 p-2 mt-3 hover:bg-red-500 transition-colors">
                    Save Changes
                  </button>
                  <button type="button" onClick={handleUpdate}>
                    Cancel
                  </button>
                </section>
              </form>
            </section>
          ) : (
            <section>
              {/* User image */}
              <section
                className={`relative h-40 rounded-t-lg flex justify-center`}
              >
                <div className="rounded-lg absolute px-8 bottom-0 max-w-[300px] mx-auto ">
                  {user?.profile_img ? (
                    <img
                      className="rounded-full shadow-lg shadow-black"
                      src={user?.profile_img}
                      alt={user?.first_name}
                    />
                  ) : (
                    <Load />
                  )}
                </div>
              </section>
              {/* Content card */}
              <section className="flex flex-col justify-center items-center my-6 text-center gap-3">
                <h2 className="font-semibold">
                  {`${user?.first_name
                    .split(" ")[0][0]
                    .toUpperCase()}${user?.first_name
                    .split(" ")[0]
                    .substring(1)} `}
                  {user?.first_name.split(" ")[1] &&
                    `${user?.first_name
                      .split(" ")[1][0]
                      .toUpperCase()}${user?.first_name
                      .split(" ")[1]
                      .substring(1)} `}
                  {`${user?.last_name
                    .split(" ")[0][0]
                    .toUpperCase()}${user?.last_name
                    .split(" ")[0]
                    .substring(1)} `}
                  {user?.last_name.split(" ")[1] &&
                    `${user?.last_name
                      .split(" ")[1][0]
                      .toUpperCase()}${user?.last_name
                      .split(" ")[1]
                      .substring(1)} `}
                </h2>
                <div className="flex gap-2">
                  <span className="font-semibold">Email:</span>
                  <span>{user?.email}</span>
                </div>
                <section className="flex gap-2">
                  <div className="flex gap-2">
                    <span className="font-semibold">Tel:</span>
                    <span>{user?.tel}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold">Ext:</span>
                    <span>{user?.ext_tel}</span>
                  </div>
                </section>
                <section>
                  <span className="font-semibold">Role: </span>
                  <span>
                    {`${
                      user?.role.split(" ")[0][0].toUpperCase() +
                      user?.role.split(" ")[0].substring(1)
                    } `}
                    {user?.role.split(" ")[1] &&
                      `${
                        user?.role.split(" ")[1][0].toUpperCase() +
                        user?.role.split(" ")[1].substring(1)
                      }`}
                  </span>
                </section>
                <section>
                  <span className="font-semibold">Description:</span>
                  <p>{user?.description}</p>
                </section>

                <section className="flex justify-center gap-8">
                  <button onClick={handleUpdate}>Update Info</button>
                  <button onClick={handleDelete}>Delete account</button>
                </section>
              </section>
            </section>
          )}
        </article>
      </section>
      <Footer />
    </div>
  );
};

export default MyProfile;

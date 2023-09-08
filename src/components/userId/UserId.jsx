import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { axiosAgencyTp, getConfig } from "../../utils/configureAxios";
import Load from "../layout/Load";
import { useSelector } from "react-redux";

const roles = [
  { label: "Jr Executive", value: "jr executive" },
  { label: "Sr Executive", value: "sr executive" },
  { label: "Supervisor", value: "supervisor" },
];

const UserId = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const { user: sessionUser } = useSelector((store) => store.userInfo);

  const handleChangeStatus = (e) => {
    const data = { role: e.target.value };
    const url = `/users/roleUserUpdate/${user._id}`;

    axiosAgencyTp
      .patch(url, data, getConfig())
      .then(({ data }) => {
        window.alert(data.message);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const url = `/users/${id}`;

    axiosAgencyTp
      .get(url, getConfig())
      .then(({ data }) => setUser(data.user))
      .catch((err) => console.log(err.response.data.message));
  }, []);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-gradient-to-t from-cyan-500 to-bkg_blue text-gray-400 items-center ">
      <Header />
      <section className="my-6 mx-2">
        <section className="flex justify-center gap-4 py-3 items-center">
          <Link to={"/principalView"}>
            <i className="bx bxs-left-arrow-circle text-3xl text-black_header hover:text-txt_blue transition-colors duration-700"></i>
          </Link>

          {sessionUser.role == "supervisor" && (
            <select
              onChange={handleChangeStatus}
              className="cursor-pointer border-none overflow-scroll outline-none bg-black_header text-txt_blue font-bold p-2 rounded-lg"
            >
              <option value="">Change role</option>
              {roles.map((role) => (
                <option key={role.label} value={role.value}>
                  {role.label[0].toUpperCase() + role.label.substring(1)}
                </option>
              ))}
            </select>
          )}
        </section>

        <article className="max-w-[1000px] text-white text-[18px]  bg-txt_gray/70 rounded-md shadow-lg shadow-gray-500 mx-4 mt-[80px] lg:mx-auto">
          <section className="flex flex-col justify-center gap-5">
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
                <h3 className="font-semibold">Description:</h3>
                <p>{user?.description}</p>
              </section>
            </section>
          </section>
        </article>
      </section>
      <Footer />
    </div>
  );
};

export default UserId;

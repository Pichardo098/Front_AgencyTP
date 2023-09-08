import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { axiosAgencyTp, getConfig } from "../../utils/configureAxios";
import Load from "../layout/Load";
import { useSelector } from "react-redux";

const roles = [
  { name: "Jr Executive", value: "" },
  { name: "Sr Executive", value: "" },
  { name: "Supervisor", value: "" },
];

const UserId = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const { user: sessionUser } = useSelector((store) => store.userInfo);

  useEffect(() => {
    const url = `/users/${id}`;

    axiosAgencyTp
      .get(url, getConfig())
      .then(({ data }) => setUser(data.user))
      .catch((err) => console.log(err.response.data.message));
  }, []);

  console.log(sessionUser);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white text-gray-400 items-center ">
      <Header />
      <section>
        <section>
          <button>{"<"}</button>

          {/* <select onChange={handleChangeMyStatus}>
            <option value="">Change your status</option>
            {typesStatus.map((status) => (
              <option key={status.name} value={status.name}>
                {status.name[0].toUpperCase() + status.name.substring(1)}
              </option>
            ))}
          </select> */}
        </section>

        <article className="max-w-[1000px]  bg-gray  rounded-md shadow-lg shadow-gray-500 mx-4 mt-[80px] lg:mx-auto">
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

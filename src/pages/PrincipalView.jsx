import { axiosAgencyTp, getConfig } from "../utils/configureAxios";
import { logout } from "../store/slices/userInfo.slice";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import ListUsers from "../components/principalView/ListUsers";
import React, { useEffect, useState } from "react";

const PrincipalView = () => {
  const [allUsers, setAllUsers] = useState([]); //Trae todos los usuarios
  const [changeStatus, setChangeStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentStatus, setCurrentStatus] = useState("");
  const [nameUser, setNameUser] = useState(""); //Enviamos el nombre que se escribe en el input
  const [typesStatus, setTypesStatus] = useState([]); //Trae todos los status queue posibles
  const { user } = useSelector((store) => store.userInfo);
  const dispatch = useDispatch();
  const [viewRoleSrJr, setViewRoleSrJr] = useState(false);

  let usersByName = [];
  if (allUsers.length > 0) {
    usersByName = allUsers.filter((user) => user.first_name.includes(nameUser));
  }

  const paginationLogic = () => {
    const USERS_PER_PAGE = 10;

    //Usuarios que se van a mostrar en la pagina actual

    const sliceStart = (currentPage - 1) * USERS_PER_PAGE;
    const sliceEnd = sliceStart + USERS_PER_PAGE;
    const usersInPage = usersByName.slice(sliceStart, sliceEnd);

    //Ultima Página
    const lastPage = Math.ceil(usersByName.length / USERS_PER_PAGE) || 1;

    //Bloque actual
    const PAGES_PER_BLOCK = 5;
    const actualBlockk = Math.ceil(currentPage / PAGES_PER_BLOCK);

    //Paginas que se vana  mostrar en el bloque actual
    const pagesInBlock = [];
    const minPage = (actualBlockk - 1) * PAGES_PER_BLOCK + 1;
    const maxPage = actualBlockk * PAGES_PER_BLOCK;
    for (let i = minPage; i <= maxPage; i++) {
      if (i <= lastPage) pagesInBlock.push(i);
    }

    return {
      usersInPage,
      lastPage,
      pagesInBlock,
    };
  };

  const { usersInPage, lastPage, pagesInBlock } = paginationLogic();

  const handleSubmit = (e) => {
    e.preventDefault();
    setNameUser(e.target.nameAgent.value.toLowerCase().trim());
  };

  const handleChangeStatus = (e) => {
    setCurrentStatus(e.target.value);
  };

  const handleChangeMyStatus = (e) => {
    setChangeStatus(e.target.value);
  };

  //Funcion de la paginacion
  const actualPage = (currentPage, numberPage) => {
    if (currentPage == numberPage) return "blur(0)";
  };
  const handleClickPreviousPage = () => {
    const newCurrentPage = currentPage - 1;
    if (newCurrentPage >= 1) {
      setCurrentPage(newCurrentPage);
    }
  };
  const handleClickNextPage = () => {
    const newCurrentPage = currentPage + 1;
    if (newCurrentPage <= lastPage) {
      setCurrentPage(newCurrentPage);
    }
  };

  //Funcion mostrar ejecutivos jr and sr
  const handleViewSrAndJr = () => {
    setViewRoleSrJr(!viewRoleSrJr);
  };

  useEffect(() => {
    if (viewRoleSrJr) {
      const url = `/users/findUsersRoleSrJr`;

      axiosAgencyTp
        .get(url, getConfig())
        .then(({ data }) => {
          setAllUsers(data.users);
        })
        .catch((err) => console.log(err));
    }
  }, [viewRoleSrJr]);

  useEffect(() => {
    if (!viewRoleSrJr) {
      const url = `/users/findUsersRoleSrJr`;

      axiosAgencyTp
        .get("/users", getConfig())
        .then(({ data }) => setAllUsers(data.users))
        .catch((err) => console.log(err));
    }
  }, [viewRoleSrJr]);

  useEffect(() => {
    //Si el currentStatus esta vacio traerá todos los usarios
    if (!currentStatus) {
      axiosAgencyTp
        .get("/users", getConfig())
        .then(({ data }) => setAllUsers(data.users))
        .catch((err) => console.log(err));
    }
  }, [currentStatus]);

  useEffect(() => {
    axiosAgencyTp
      .get("/queue/typeStatus", getConfig())
      .then(({ data }) => setTypesStatus(data.status))
      .catch((err) => {
        if (err.response.data.message == "jwt expired") {
          window.alert("Please login again");
          dispatch(logout());
        }
      });
  }, []);

  //Get users by status
  useEffect(() => {
    if (currentStatus) {
      const URL = `/queue/${currentStatus}`;

      axiosAgencyTp
        .get(URL, getConfig())
        .then(({ data }) => setAllUsers(data.users))
        .catch((err) => console.log(err));
    }
  }, [currentStatus]);

  useEffect(() => {
    setCurrentPage(1);
  }, [currentStatus, nameUser]);

  useEffect(() => {
    if (!changeStatus) {
      const url = "/queue/changeMyStatus";
      const data = { queue_status: "busy" };
      axiosAgencyTp
        .patch(url, data, getConfig())
        .then(() => {})
        .catch((err) => {
          err;
        });
    }
  }, [changeStatus]);

  useEffect(() => {
    if (changeStatus) {
      const url = "/queue/changeMyStatus";
      const data = { queue_status: changeStatus };
      axiosAgencyTp
        .patch(url, data, getConfig())
        .then(({ data }) => {})
        .catch((err) => {
          err;
        });
    }
  }, [changeStatus]);

  const hasUsers = usersInPage.length > 0;

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white text-gray-400 ">
      <Header />
      <main className="grid grid-rows-[auto_1fr]">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div>
            <input
              placeholder="Type a name agent.."
              type="text"
              id="nameAgent"
            />
            <button>Search</button>
          </div>

          <section className="flex gap-4">
            <select onChange={handleChangeStatus}>
              <option value="">All Status</option>
              {typesStatus.map((status) => (
                <option key={status.name} value={status.name}>
                  {status.name[0].toUpperCase() + status.name.substring(1)}
                </option>
              ))}
            </select>

            <select onChange={handleChangeMyStatus}>
              <option value="">Change your status</option>
              {typesStatus.map((status) => (
                <option key={status.name} value={status.name}>
                  {status.name[0].toUpperCase() + status.name.substring(1)}
                </option>
              ))}
            </select>
          </section>
          <section>
            {user.role == "supervisor" && (
              <button type="submit" onClick={handleViewSrAndJr}>
                View Execuites Jr And Sr
              </button>
            )}
          </section>
        </form>

        <ListUsers usersInPage={usersInPage} />
        {hasUsers && (
          <ul className="flex justify-around ">
            <li
              onClick={() => setCurrentPage(1)}
              className={`bg-btn_red ${
                currentPage == 1 ? "hidden" : "visible"
              } py-2 px-4 text-bkg_white rounded-md font-extrabold shadow-lg shadow-gray-500 dark:shadow-dk_bg_card cursor-pointer hover:bg-btn_hover hover:scale-125  `}
            >
              {"<<"}
            </li>
            <li
              onClick={handleClickPreviousPage}
              className={`bg-btn_red ${
                currentPage == 1 ? "hidden" : "visible"
              } py-2 px-4 text-bkg_white rounded-md font-extrabold shadow-lg shadow-gray-500 dark:shadow-dk_bg_card cursor-pointer hover:bg-btn_hover hover:scale-125  `}
            >
              {"<"}
            </li>
            {pagesInBlock.map((numberPage) => (
              <li
                style={{ filter: actualPage(currentPage, numberPage) }}
                className={`bg-btn_red py-2 px-4 blur-sm hover:blur-none text-bkg_white rounded-md font-extrabold shadow-lg shadow-gray-500 dark:shadow-dk_bg_card cursor-pointer  hover:scale-125  `}
                onClick={() => setCurrentPage(numberPage)}
                key={numberPage}
              >
                {numberPage}
              </li>
            ))}
            <li
              onClick={handleClickNextPage}
              className={`bg-btn_red ${
                currentPage == lastPage ? "hidden" : "visible"
              } py-2 px-4 text-bkg_white rounded-md font-extrabold shadow-lg shadow-gray-500 dark:shadow-dk_bg_card cursor-pointer hover:bg-btn_hover hover:scale-125  `}
            >
              {">"}
            </li>
            <li
              onClick={() => setCurrentPage(lastPage)}
              className={`bg-btn_red ${
                currentPage == lastPage ? "hidden" : "visible"
              } py-2 px-4 text-bkg_white rounded-md font-extrabold shadow-lg shadow-gray-500 dark:shadow-dk_bg_card cursor-pointer hover:bg-btn_hover hover:scale-125  `}
            >
              {">>"}
            </li>
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PrincipalView;

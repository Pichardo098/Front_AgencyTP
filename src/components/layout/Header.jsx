import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const { user } = useSelector((store) => store.userInfo);

  const firstName = user.first_name.split(" ")[0];
  const lastName = user.last_name.split(" ")[0];

  return (
    <header className="h-[50px]">
      <nav className="h-full flex justify-between text-center items-center px-2">
        <Link to={"/principalView"}>App To Connect</Link>

        <Link
          to={"/myProfile"}
          className="flex justify-between items-center gap-2"
        >
          <section>
            <h2>
              {`${firstName[0].toUpperCase() + firstName.substring(1)} ${
                lastName[0].toUpperCase() + lastName.substring(1)
              }`}
            </h2>
            <span>{user.tel}</span>
          </section>
          <div className="h-[40px] aspect-square overflow-hidden">
            <img
              className="w-full h-full object-contain rounded-full"
              src={user.profile_Img}
              alt={user.first_name}
            />
          </div>
        </Link>
      </nav>
    </header>
  );
};

export default Header;

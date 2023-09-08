import { Link } from "react-router-dom";

const status = {
  available: "bg-green-500",
  unavailable: "bg-gray-400",
  busy: "bg-red-500",
};

const User = ({ user }) => {
  return (
    <article className="h-[70px] flex flex-row justify-around items-center gap-2 text-[14px]">
      <div className="h-[70px] aspect-square ">
        <img
          src={user.profile_img}
          alt={user.first_name}
          className="h-full w-full object-contain rounded-full"
        />
      </div>
      <article className="flex flex-col justify-center ">
        <section>
          <h2 className="font-semibold">
            {`${user.first_name.split(" ")[0][0].toUpperCase()}${user.first_name
              .split(" ")[0]
              .substring(1)} 
              ${user.last_name.split(" ")[0][0].toUpperCase()}${user.last_name
              .split(" ")[0]
              .substring(1)}`}
          </h2>
          <div className="flex gap-2">
            <span className="font-semibold">Email:</span>
            <span>{user.email}</span>
          </div>
        </section>
        <section className="flex gap-2">
          <div className="flex gap-2">
            <span className="font-semibold">Tel:</span>
            <span>{user.tel}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-semibold">Ext:</span>
            <span>{user.ext_tel}</span>
          </div>
        </section>
      </article>
      <section>
        <div
          className={`h-[10px] aspect-square bg-gre ${
            status[user.queue_status]
          } rounded-full`}
        ></div>
        <Link to={`/user/${user._id}`}>{">"}</Link>
      </section>
    </article>
  );
};

export default User;

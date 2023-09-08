import User from "./User";

const ListUsers = ({ usersInPage }) => {
  return (
    <section>
      {usersInPage.map((user) => (
        <User user={user} key={user._id} />
      ))}
    </section>
  );
};

export default ListUsers;

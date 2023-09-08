import User from "./User";

const ListUsers = ({ usersInPage }) => {
  return (
    <section className="grid gap-4 grid-cols-[repeat(auto-fill,330px)] justify-center my-4">
      {usersInPage.map((user) => (
        <User user={user} key={user._id} />
      ))}
    </section>
  );
};

export default ListUsers;

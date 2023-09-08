import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { loginUser } from "../store/slices/userInfo.slice";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/layout/Footer";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const { token, user } = useSelector((store) => store.userInfo);

  const submit = (dataForm) => {
    dispatch(loginUser(dataForm));
  };

  return (
    <section className="flex flex-col min-h-screen justify-between bg-gray-200 text-black  ">
      <header className="h-[50px]">
        {token ? (
          <Navigate to="/principalView" />
        ) : (
          <nav className="h-full flex justify-between text-center items-center px-2">
            <h1>App To Connect</h1>
          </nav>
        )}
      </header>

      <form
        onSubmit={handleSubmit(submit)}
        className="p-5 mx-auto bg-white rounded-lg max-w-[350px]  flex flex-col gap-6 my-8"
      >
        <h3 className="font-bold text-2xl mt-2">
          Please, enter your email and password to continue
        </h3>

        <section className="bg-cyan-100 p-3 rounded-lg my-4">
          <h5 className="text-center font-bold mb-2">Test Data</h5>
          <div className="flex items-center gap-2">
            <i className="bx bxs-envelope text-xl"></i>
            <span>jesus098856@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="bx bx-lock-alt text-xl"></i>
            <span>pass1234</span>
          </div>
        </section>

        <div className="grid gap-3">
          <label className="text-sm font-semibold" htmlFor="email">
            Email:
          </label>
          <input
            required
            {...register("email")}
            className="border-2 rounded-md outline-none p-2"
            type="email"
            id="email"
          />
        </div>
        <div className="grid gap-3">
          <label className="text-sm font-semibold" htmlFor="password">
            Password:
          </label>
          <input
            required
            {...register("password")}
            className="border-2 rounded-md outline-none p-2"
            type="password"
            id="password"
          />
        </div>

        <button
          type="submit"
          className="text-white bg-red-600 p-2 mt-3 hover:bg-red-500 transition-colors"
        >
          Login
        </button>

        <p className="text-start py-3">
          Don't have an account?{" "}
          <Link
            to={"/signup"}
            className="text-blue-600 underline hover:no-underline"
          >
            Sign up
          </Link>
        </p>
      </form>

      <Footer />
    </section>
  );
};

export default Login;

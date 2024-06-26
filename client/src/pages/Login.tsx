import { useAuthenticated, useLogin } from "@/lib/Queries/UserQueries";
import { AuthData, FormError } from "@/utils/Types & Interfaces";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { MoonLoader, PropagateLoader } from "react-spinners";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useUserContext from "@/hooks/Context/useUserContext";

const LoginSchema = z.object({
  username: z.string().min(3, { message: "Username is too short" }),
  password: z.string().min(6),
});

type LoginType = z.infer<typeof LoginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { setUserData } = useUserContext();
  const loginMutation = useLogin();
  const isLogged = useAuthenticated();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginType>({ resolver: zodResolver(LoginSchema) });

  const error = (errors as FormError).root?.message?.message;

  const handleLogin: SubmitHandler<LoginType> = (data) => {
    loginMutation.mutate(data);
  };

  useEffect(() => {
    if (loginMutation.isError) {
      const res = (loginMutation.failureReason as AxiosError).response
        ?.data as string;
      setError("root", { message: res });
      loginMutation.reset();
    }

    if (loginMutation.isSuccess) {
      setUserData({
        userId: loginMutation.data.id,
        username: loginMutation.data.userName,
        email: loginMutation.data.email,
      } as AuthData);

      if (searchParams.get("next")) {
        navigate(`/${searchParams.get("next")}`);
      } else {
        navigate("/profile");
      }
    }
  }, [
    loginMutation.isError,
    loginMutation.isSuccess,
    navigate,
    searchParams,
    setError,
    setUserData,
  ]);

  if (isLogged.isFetching)
    return (
      <div className="h-[80vh] w-[80%] m-auto flex justify-center items-center">
        <PropagateLoader color="#15bde1" />
      </div>
    );

  return (
    <div className="flex flex-col lg:flex-row min-h-[70vh] sm:w-[80%] gap-6 md:w-[65%]  lg:w-3/4 m-auto lg:mt-12">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="container flex flex-col gap-6 py-12 mt-6 font-inter lg:w-2/4 lg:border lg:h-3/4 lg:rounded-xl lg:shadow-lg border-zinc-300"
      >
        <h1 className="text-lg font-semibold text-center lg:text-left text-zinc-600 dark:text-zinc-200">
          To continue, please login
        </h1>
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="w-full px-3 py-2 border-2 rounded-md shadow-inner border-zinc-400 dark:border-zinc-500 dark:bg-slate-700"
          {...register("username")}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="w-full px-3 py-2 border-2 rounded-lg border-zinc-400 dark:border-zinc-500 dark:bg-slate-700"
          {...register("password")}
        />
        <span
          className={`${
            error ? "block" : "hidden"
          } text-red-500 text-base font-semibold text-center `}
        >
          {error}
        </span>
        <button
          type="submit"
          className="flex items-center justify-center w-full py-3 text-lg font-bold duration-200 bg-blue-600 hover:bg-blue-400 lg:mt-8 rounded-xl text-zinc-200"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? <MoonLoader size={22} /> : "Login"}
        </button>
      </form>
      <hr className="w-3/4 mx-auto mb-4 border-b lg:hidden border-zinc-400" />
      <div className="container flex flex-col gap-8 lg:w-2/4 lg:pt-12">
        <h1 className="text-xl font-semibold text-center text-zinc-600 lg:hidden dark:text-zinc-200">
          Don't have an account?
        </h1>
        <h1 className="hidden mb-2 text-3xl font-semibold text-blue-700 dark:text-blue-400 lg:block">
          Create an account, quick, <br />
          easy and free!
        </h1>
        <p className="hidden text-lg font-[500] lg:block">
          With your account, you have access to exclusive deals, discounts, save
          products on your favorites so you can check them out later and much
          more!
        </p>

        <button
          onClick={() => navigate("/register")}
          disabled={loginMutation.isPending}
          className="w-full py-3 text-lg font-bold duration-200 bg-transparent border-2 shadow-inner dark:text-zinc-200 dark:border-zinc-300 hover:bg-slate-100 dark:hover:bg-slate-700 border-zinc-800 rounded-xl text-zinc-700"
        >
          Click here to register
        </button>
      </div>
    </div>
  );
};
export default Login;

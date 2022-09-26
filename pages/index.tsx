import { CLIENT_STATIC_FILES_RUNTIME_POLYFILLS } from "next/dist/shared/lib/constants";
import { useForm, FieldErrors } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  password: string;
  globalError?: string;
};

const cls = (...clsNames: string[]): string => clsNames.join(" ");

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    reset,
  } = useForm<FormData>({
    mode: "onChange",
  });

  const onValid = (data: FormData) => {
    console.log(data);
    // setError("name", {message:"name is duplicated"})
    // setError("globalError", {message:"backend is offline..."})
    reset();
  };

  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <form
      className="w-full h-screen flex flex-col justify-center items-center space-y-9 p-10"
      onSubmit={handleSubmit(onValid, onInvalid)}
    >
      <label htmlFor="name" className="w-[40rem] space-y-2">
        <p>Name:</p>
        <input
          {...register("name", {
            required: "name is required",
            minLength: {
              message: "name should be longer than 5 characters",
              value: 5,
            },
          })}
          id="name"
          type="text"
          placeholder="specfiy name"
          className={cls(
            "w-full border rounded-xl p-2 outline-none",
            `${
              Boolean(errors.name?.message)
                ? "border-red-500"
                : "border-blue-700"
            }`
          )}
        />
        {errors.name ? (
          <p className="text-red-600 font-bold text-xs">
            {errors.name.message}
          </p>
        ) : (
          <p></p>
        )}
      </label>

      <label htmlFor="email" className="w-[40rem] space-y-2">
        <p>Email:</p>
        <input
          {...register("email", {
            required: "email is required",
            validate: {
              notGamail: (value) =>
                !value.includes("@gmail.com") || "Gmail is not allowed",
            },
          })}
          id="email"
          type="email"
          placeholder="specfiy email"
          className={cls(
            "w-full border rounded-xl p-2 outline-none",
            `${
              Boolean(errors.email?.message)
                ? "border-red-500"
                : "border-blue-700"
            }`
          )}
        />
        {errors.email ? (
          <p className="text-red-600 font-bold text-xs">
            {errors.email.message}
          </p>
        ) : (
          <p></p>
        )}
      </label>

      <label htmlFor="password" className="w-[40rem] space-y-2">
        <p>Password:</p>
        <input
          {...register("password", {
            required: "password is required",
            minLength: {
              message: "password should be longer than 8 characters",
              value: 8,
            },
          })}
          id="password"
          type="password"
          placeholder="specfiy name"
          className={cls(
            "w-full border rounded-xl p-2 outline-none",
            `${
              Boolean(errors.password?.message)
                ? "border-red-500"
                : "border-blue-700"
            }`
          )}
        />
        {errors.password ? (
          <p className="text-red-600 font-bold text-xs">
            {errors.password.message}
          </p>
        ) : (
          <p></p>
        )}
      </label>

      <button
        type="submit"
        className="w-[40rem] bg-blue-400 p-2 rounded-xl text-white font-bold shadow-lg hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}

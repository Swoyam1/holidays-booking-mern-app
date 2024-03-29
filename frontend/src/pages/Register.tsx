import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const { showToast } = useAppContext();
  const { register, watch, handleSubmit } = useForm<RegisterFormData>();

  const navigate = useNavigate();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Registration Success!", type: "SUCCESS" });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label htmlFor="" className="flex-1 text-gray-700 text-sm font-bold">
          First Name
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("firstName", { required: "This field is required!" })}
          />
        </label>
        <label htmlFor="" className="flex-1 text-gray-700 text-sm font-bold">
          Last Name
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastName", { required: "This field is required!" })}
          />
        </label>
      </div>
      <label htmlFor="" className="text-gray-700 text-sm font-bold">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is required!" })}
        />
      </label>
      <label htmlFor="" className="text-gray-700 text-sm font-bold">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required!",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
      </label>
      <label htmlFor="" className="text-gray-700 text-sm font-bold">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) return "This field is required!";
              else if (watch("password") !== val) {
                return "Your password do not match";
              }
            },
          })}
        />
      </label>
      <span>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;

import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import doFetch from "../../helpers/fetchHelper";

import { FiUserPlus } from "react-icons/fi";

const RegisterScreen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formInvalid = () => console.log("Errors", errors);

  const [msg, setMsg] = useState("");

  const formSubmit = async (formData) => {
    const { data } = await doFetch("auth/register", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    console.log(data);
    setMsg(data?.data?.message);
  };

  return (
    <>
      <div className="bg-gray-50 min-h-84vh flex flex-col justify-center items-center">
        {/* <div className="flex flex-row items-center">
          <span className="">
            <FiUserPlus className="text-2xl" />
          </span>
          <span className="ml-1 font-Rubik">Sign in</span>
        </div> */}
        <form
          className="p-3 flex flex-col w-full md:w-full lg:w-9/12"
          onSubmit={handleSubmit(formSubmit, formInvalid)}
          noValidate
        >
          <div className="flex flex-col sm:flex-row sm:justify-between lg:flex-row lg:justify-between">
            <div className="sm:w-49 lg:w-49">
              <label htmlFor="firstName-input" className="text-gray-500">
                First Name <span className="text-red-400">*</span>
              </label>
              <input
                id="firstName-input"
                className="border border-gray-300 w-full p-2 mb-2 focus:outline-none text-gray-600"
                type="text"
                placeholder="John"
                name="firstName"
                autoComplete="off"
                {...register("firstName", { required: true, minLength: 3 })}
              />
            </div>

            <div className="sm:w-49 lg:w-49">
              <label htmlFor="lastName-input" className="text-gray-500">
                Last Name <span className="text-red-400">*</span>
              </label>
              <input
                id="lastName-input"
                className="border border-gray-300 w-full p-2 mb-2 focus:outline-none text-gray-600"
                type="text"
                placeholder="Doe"
                name="lastName"
                autoComplete="off"
                {...register("lastName", { required: true, minLength: 2 })}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between lg:flex-row lg:justify-between">
            <div className="sm:w-49 lg:w-49">
              <label htmlFor="pseudo-input" className="text-gray-500">
                Pseudo <span className="text-red-400">*</span>
              </label>
              <input
                id="pseudo-input"
                className="border border-gray-300 w-full p-2 mb-2 focus:outline-none text-gray-600"
                type="text"
                placeholder="Rocket78"
                name="pseudo"
                autoComplete="off"
                {...register("pseudo", { required: true, minLength: 3 })}
              />
            </div>
            <div className="sm:w-49 lg:w-49">
              <label htmlFor="mailAdress-input" className="text-gray-500">
                E-mail Adress <span className="text-red-400">*</span>
              </label>
              <input
                id="mailAdress-input"
                className="border border-gray-300 w-full p-2 mb-2 focus:outline-none text-gray-600"
                type="email"
                placeholder="exemple@gmail.com"
                name="mail"
                autoComplete="off"
                {...register("mail", {
                  required: true,
                  pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                })}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between lg:flex-row lg:justify-between">
            <div className="sm:w-49 lg:w-49">
              <label htmlFor="birthday" className="text-gray-500">
                Birthday <span className="text-red-400">*</span>
              </label>
              <input
                className="border border-gray-300 w-full p-2 mb-2 focus:outline-none tracking-wider text-gray-600"
                type="date"
                id="birthday"
                name="birthday"
                autoComplete="off"
                {...register("birthday", { required: true })}
              ></input>
            </div>
            <div className="sm:w-49 lg:w-49">
              <label htmlFor="gender" className="text-gray-500">
                Gender <span className="text-red-400">*</span>
              </label>
              <select
                name="gender"
                id="gender"
                className="border border-gray-300 w-full p-2 mb-2 focus:outline-none text-gray-600"
                {...register("gender", { required: true })}
              >
                <option value="">Select your gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <label htmlFor="postalAdress" className="text-gray-500">
            Postal Adress <span className="text-red-400">*</span>
          </label>
          <input
            className="border border-gray-300 w-full p-2 mb-2 focus:outline-none tracking-wider text-gray-600"
            type="text"
            id="postalAdress"
            name="postalAdress"
            autoComplete="off"
            {...register("postalAdress", { required: true })}
          ></input>

          <label htmlFor="city" className="text-gray-500">
            City <span className="text-red-400">*</span>
          </label>
          <input
            className="border border-gray-300 w-full p-2 mb-2 focus:outline-none tracking-wider text-gray-600"
            type="text"
            id="city"
            name="city"
            autoComplete="off"
            {...register("city", { required: true })}
          ></input>

          <label htmlFor="postCode" className="text-gray-500">
            Post Code <span className="text-red-400">*</span>
          </label>
          <input
            className="border border-gray-300 w-full p-2 mb-2 focus:outline-none tracking-wider text-gray-600"
            type="text"
            id="postCode"
            name="postCode"
            autoComplete="off"
            {...register("postCode", { required: true })}
          ></input>

          <label htmlFor="country" className="text-gray-500">
            Country <span className="text-red-400">*</span>
          </label>
          <input
            className="border border-gray-300 w-full p-2 mb-2 focus:outline-none tracking-wider text-gray-600"
            type="text"
            id="country"
            name="country"
            autoComplete="off"
            {...register("country", { required: true })}
          ></input>

          <button
            type="submit"
            className="font-Rubik p-2 mb-1 mt-2 w-full flex flex-row items-center justify-center bg-orange-500 hover:bg-orange-400 active:bg-orange-600 rounded-lg"
          >
            <div className="flex flex-row items-center">
              <FiUserPlus className="text-2xl text-white" />
              <span className="ml-1 text-white">Create an account</span>
            </div>
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterScreen;

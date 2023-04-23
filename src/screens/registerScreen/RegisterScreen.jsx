import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import doFetch from "../../helpers/fetchHelper";

const RegisterScreen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formInvalid = () => console.log("Erros", errors);

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
      <div className="bg-slate-200 min-h-84vh">
        <form
          className="p-3"
          onSubmit={handleSubmit(formSubmit, formInvalid)}
          noValidate
        >
          <div className="flex flex-col">
            <label htmlFor="firstName-input" className="text-gray-500">
              First Name
            </label>
            <input
              id="firstName-input"
              className="border border-gray-300 w-full p-2 mb-2 focus:outline-none"
              type="text"
              placeholder="John"
              name="firstName"
              autoComplete="off"
            />
            <label htmlFor="lastName-input" className="text-gray-500">
              Last Name
            </label>
            <input
              id="lastName-input"
              className="border border-gray-300 w-full p-2 mb-2 focus:outline-none"
              type="text"
              placeholder="Doe"
              name="lastName"
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="pseudo-input" className="text-gray-500">
              Pseudo <span className="text-red-400">*</span>
            </label>
            <input
              id="pseudo-input"
              className="border border-gray-300 w-full p-2 mb-2 focus:outline-none"
              type="text"
              placeholder="Rocket78"
              name="pseudo"
              autoComplete="off"
              {...register("pseudo", { required: true, minLength: 3 })}
            />
            <label htmlFor="mailAdress-input" className="text-gray-500">
              E-mail Adress <span className="text-red-400">*</span>
            </label>
            <input
              id="mailAdress-input"
              className="border border-gray-300 w-full p-2 mb-2 focus:outline-none"
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
          <label htmlFor="birthday" className="text-gray-500">
            Date de naissance
          </label>
          <input
            className="border border-gray-300 w-full p-2 mb-2 focus:outline-none tracking-wider text-gray-500"
            type="date"
            id="birthday"
            name="birthday"
            autoComplete="off"
            // onInput={() => {
            //   const input = document.getElementById("birthday");
            //   input.classList.add("onInput");
            // }}
          ></input>

          <button type="submit" className="">
            S'inscrire
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterScreen;

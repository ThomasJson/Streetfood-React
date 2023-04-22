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
            <input
              id="lastName-input"
              className="border border-gray-300 w-full p-2 mb-2 focus:outline-none"
              type="text"
              placeholder="Last Name"
              name="lastName"
              autoComplete="off"
            />
            <input
              id="firstName-input"
              className="border border-gray-300 w-full p-2 mb-2 focus:outline-none"
              type="text"
              placeholder="First Name "
              name="firstName"
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col">
            <input
              id="pseudo-input"
              className="border border-gray-300 w-full p-2 mb-2 focus:outline-none"
              type="text"
              placeholder="Pseudo *"
              name="pseudo"
              autoComplete="off"
              {...register("pseudo", { required: true, minLength: 3 })}
            />
            <input
              id="mailAdress-input"
              className="border border-gray-300 w-full p-2 mb-2 focus:outline-none"
              type="email"
              placeholder="E-mail Adress *"
              name="mail"
              autoComplete="off"
              {...register("mail", {
                required: true,
                pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
              })}
            />
          </div>
          <label htmlFor="birthday" className="">
            Date de naissance
          </label>
          <input
            className="border border-gray-300 w-full p-2 mb-2 focus:outline-none"
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

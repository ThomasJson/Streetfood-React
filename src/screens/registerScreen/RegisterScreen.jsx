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
          className=""
          onSubmit={handleSubmit(formSubmit, formInvalid)}
          noValidate
        >
          <div className="">
            <input
              id="firstName-input"
              className=""
              type="text"
              placeholder="Prénom"
              name="firstName"
              autoComplete="off"
              // onInput={() => {
              //   const input = document.getElementById("firstName-input");
              //   input.classList.add("onInput");
              // }}
            />
            <input
              id="lastName-input"
              className=""
              type="text"
              placeholder="Nom de famille"
              name="lastName"
              autoComplete="off"
              // onInput={() => {
              //   const input = document.getElementById("lastName-input");
              //   input.classList.add("onInput");
              // }}
            />
          </div>
          <input
            id="pseudo-input"
            className=""
            type="text"
            placeholder="Pseudo *"
            name="pseudo"
            autoComplete="off"
            {...register("pseudo", { required: true, minLength: 3 })}
          />
          <input
            id="mailAdress-input"
            className=""
            type="email"
            placeholder="Adresse e-mail *"
            name="mail"
            autoComplete="off"
            {...register("mail", {
              required: true,
              pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
            })}
          />
          <label htmlFor="birthday" className="">
            Date de naissance
          </label>
          <input
            className=""
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

import React from "react";
import { useState } from "react";
import doFetch from "../../helpers/fetchHelper";
import { useForm } from "react-hook-form";

import { FiUserPlus } from "react-icons/fi";

const RegisterModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formInvalid = () => console.log("Erros", errors);

  //   const [msg, setMsg] = useState("");

  const formSubmit = async (formData) => {
    const { data } = await doFetch("auth/register", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    console.log(data);
    // setMsg(data?.data?.message);
  };

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  return (
    <div>
      <button className="button-custom ml-2" onClick={toggleModal}>
        <div className="flex flex-row items-center">
          <span className="">
            <FiUserPlus className="text-2xl" />
          </span>
          <span className="hidden lg:flex ml-1 font-Rubik">Sign up</span>
        </div>
        <div className="bottom-border"></div>
        <div className="right-border"></div>
        <div className="top-border"></div>
        <div className="left-border"></div>
      </button>

      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={handleOutsideClick}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-6 w-full max-w-md m-auto rounded-lg shadow-lg z-10">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Register</h2>
              <button
                className="text-gray-700 hover:text-gray-900 focus:outline-none"
                onClick={toggleModal}
              >
                &times;
              </button>
            </div>
            <form
              className="mt-4"
              onSubmit={handleSubmit(formSubmit, formInvalid)}
              noValidate
            >
              <div className="mb-4">
                <input
                  id="firstName-input"
                  className=""
                  type="text"
                  placeholder="Prénom"
                  name="firstName"
                  autoComplete="off"
                />
              </div>
              <div className="mb-4">
                <input
                  id="lastName-input"
                  className=""
                  type="text"
                  placeholder="Nom de famille"
                  name="lastName"
                  autoComplete="off"
                />
              </div>
              <div className="mb-4">
                <input
                  id="pseudo-input"
                  className=""
                  type="text"
                  placeholder="Pseudo *"
                  name="pseudo"
                  autoComplete="off"
                  {...register("pseudo", { required: true, minLength: 3 })}
                />
              </div>
              <div className="mb-4">
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
              </div>
              <div className="mb-4">
                <input
                  className=""
                  type="date"
                  id="birthday"
                  name="birthday"
                  autoComplete="off"
                />
              </div>
              <button type="submit" className="button-custom font-Raleway">
                <span className="">Register</span>
                <div className="bottom-border"></div>
                <div className="right-border"></div>
                <div className="top-border"></div>
                <div className="left-border"></div>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterModal;

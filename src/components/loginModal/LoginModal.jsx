import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import doFetch from "../../helpers/fetchHelper";
import { AuthContext } from "../../contexts/AuthContext";
import { deleteCookie, setCookie } from "../../helpers/cookieHelper";

import { BiLogInCircle, BiCrown } from "react-icons/bi";

const LoginModal = () => {
  const { setAuth } = useContext(AuthContext);

  //   const [valid, setValid] = useState({ email: false, password: false });

  const navigate = useNavigate();

  const validForm = (jsonData) => {
    const isValid = { email: false, password: false };

    const emailInput = document.getElementById("email-input");
    const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (emailPattern.test(emailInput.value)) {
      isValid.email = true;
    }

    const passwordInput = document.getElementById("password-input");
    const passwordPattern = /^(?=.*[A-Z]).{6,}$/;
    if (passwordPattern.test(passwordInput.value)) {
      isValid.password = true;
    }

    // setValid(isValid);

    return isValid.email === true && isValid.password === true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const jsonData = Object.fromEntries(formData.entries());
    console.log(jsonData);

    if (!validForm(jsonData)) {
      return;
    }

    const { data } = await doFetch("auth/login", {
      method: "POST",
      body: JSON.stringify(jsonData),
    });
    console.log("data:", data);

    if (data?.data?.result) {
      setAuth({ role: +data.data?.role, id: data.data?.id });
      setCookie("blog", data.data?.token, { "max-age": 60 * 60 * 24 });
      navigate("/");
    } else {
      setAuth({ role: 0, id: "0" });
      deleteCookie("blog");
    }
  };

  const [showModal, setShowModal] = useState(false);

  const modalRef = useRef();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      toggleModal();
    }
  };

  return (
    <div>
      <button
        className="button-custom font-Raleway"
        data-text="Login"
        onClick={toggleModal}
      >
        <div className="flex flex-row items-center">
          <span className="">
            <BiLogInCircle className="text-2xl" />
          </span>
          <span className="hidden lg:flex ml-1 font-Rubik">Sign in</span>
        </div>
        <div className="bottom-border"></div>
        <div className="right-border"></div>
        <div className="top-border"></div>
        <div className="left-border"></div>
      </button>

      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-5"
          onClick={handleClickOutside}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div ref={modalRef} className="w-full max-w-sm m-auto rounded-lg shadow-lg z-10 bg-white">
            <div className="flex justify-between items-center bg-zinc-800">
              <h2 className="p-3 w-full text-2xl text-white text-center">
                Sign in
              </h2>
              {/* <button
                className="text-white text-2xl focus:outline-none"
                onClick={toggleModal}
              >
                &times;
              </button> */}
            </div>
            <div className="p-3">
              <form
                className="w-full flex flex-col items-center"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="mb-4 w-full">
                  {/* <label htmlFor="email-input" className="text-white">E-mail Adress :</label> */}
                  <input
                    id="email-input"
                    type="email"
                    name="mail"
                    autoComplete="off"
                    className="border border-gray-300 w-full p-2 focus:outline-none"
                    placeholder="example@email.com"
                  />
                </div>
                <div className="mb-4 w-full">
                  {/* <label htmlFor="password-input" className="text-white">Password :</label> */}
                  <input
                    id="password-input"
                    type="password"
                    name="password"
                    className="border border-gray-300 w-full p-2 focus:outline-none"
                    placeholder="Password"
                  />
                </div>
                <button
                  type="submit"
                  className="font-Rubik p-2 mb-4 w-full flex flex-row items-center justify-center bg-green-800"
                >
                  <div className="flex flex-row items-center">
                    <BiLogInCircle className="text-2xl text-white" />
                    <span className="ml-1 text-white">Sign in</span>
                  </div>
                </button>
              </form>
              <div className="text-center">Forgot your Password ?</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginModal;

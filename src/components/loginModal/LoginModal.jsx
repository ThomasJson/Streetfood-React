import React, { useContext, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import doFetch from "../../helpers/fetchHelper";
import { AuthContext } from "../../contexts/AuthContext";
import { deleteCookie, setCookie } from "../../helpers/cookieHelper";

import { BiLogInCircle } from "react-icons/bi";
import { FiUserPlus } from "react-icons/fi";

const LoginModal = () => {
  const { setAuth } = useContext(AuthContext);

  const [valid, setValid] = useState({ email: true, password: true });
  const [errorMessage, setErrorMessage] = useState("");

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

    setValid(isValid);

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

    if (data?.data?.result) {
      setAuth({ role: +data.data?.role, id: data.data?.id });
      setCookie("blog", data.data?.token, { "max-age": 60 * 60 * 24 });
      navigate("/");
    } else {
      if (data?.data?.result === false) {
        setErrorMessage("Incorrect email or password.");
      }
      setAuth({ role: 0, id: "0" });
      deleteCookie("blog");
    }

    console.log("data:", data);
  };

  const [showModal, setShowModal] = useState(false);

  const modalRef = useRef();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      valid.email = true;
      valid.password = true;
      setErrorMessage("");
      toggleModal();
    }
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  return (
    <div>
      <button className="button-custom" onClick={toggleModal}>
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
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative w-4/5 lg:w-2/5">
            <div
              ref={modalRef}
              className="w-full max-w-sm m-auto rounded-lg shadow-lg z-10 bg-white"
            >
              <div className="flex p-3 justify-center items-center bg-zinc-800 rounded-t-lg">
                <BiLogInCircle className="text-3xl text-white" />
                <span className="ml-1 text-white text-xl">Sign in</span>
              </div>
              <div className="p-3">
                <form
                  className="w-full flex flex-col"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className="w-full mt-1">
                    <label htmlFor="email-input" className="text-gray-500">
                      Email Adress
                    </label>
                    <input
                      id="email-input"
                      type="email"
                      name="mail"
                      autoComplete="off"
                      className="border border-gray-300 w-full p-2 focus:outline-none"
                      placeholder="exemple@gmail.com"
                    />
                  </div>

                  {!valid.email && (
                    <p className="text-red-400">
                      Please enter a valid email address.
                    </p>
                  )}

                  <div className="mt-4 w-full">
                    <label htmlFor="password-input" className=" text-gray-500">
                      Password
                    </label>
                    <input
                      id="password-input"
                      type="password"
                      name="password"
                      className="border border-gray-300 w-full p-2 focus:outline-none"
                      placeholder="••••••"
                    />
                  </div>

                  {!valid.password && (
                    <p className="text-red-400">
                      The password must contain at least 6 characters, including
                      at least one uppercase letter.
                    </p>
                  )}

                  <p className="text-red-400">{errorMessage}</p>

                  <div className="text-center mt-2 mb-3">
                    Forgot your Password ?
                  </div>
                  <button
                    type="submit"
                    onClick={() => setErrorMessage("")}
                    className="font-Rubik p-2 mb-1 w-full flex flex-row items-center justify-center bg-green-600 hover:bg-green-500 active:bg-green-700 rounded-lg"
                  >
                    <div className="flex flex-row items-center">
                      <BiLogInCircle className="text-2xl text-white" />
                      <span className="ml-1 text-white">Sign in</span>
                    </div>
                  </button>
                </form>
              </div>
              <div className="bg-zinc-800 p-3 rounded-b-lg">
                <div className="text-center mb-2 text-white">No account ?</div>
                <NavLink to="/register">
                  <button
                    onClick={toggleModal}
                    className="font-Rubik p-2 mb-1 w-full flex flex-row items-center justify-center bg-orange-500 hover:bg-orange-400 active:bg-orange-600 rounded-lg"
                  >
                    <div className="flex flex-row items-center">
                      <FiUserPlus className="text-2xl text-white" />
                      <span className="ml-1 text-white">Create an account</span>
                    </div>
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginModal;

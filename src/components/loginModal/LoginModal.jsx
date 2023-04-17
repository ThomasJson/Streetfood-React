import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import doFetch from "../../helpers/fetchHelper";
import { AuthContext } from "../../contexts/AuthContext";
import { deleteCookie, setCookie } from "../../helpers/cookieHelper";

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
      <button
        className="bg-blue-500 h-1/2 text-white font-bold py-1 px-2 rounded"
        onClick={toggleModal}
      >
        Login
      </button>

      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={handleOutsideClick}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-6 w-full max-w-md m-auto rounded-lg shadow-lg z-10">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Login</h2>
              <button
                className="text-gray-700 hover:text-gray-900 focus:outline-none"
                onClick={toggleModal}
              >
                &times;
              </button>
            </div>
            <form className="mt-4" onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                <input
                  id="email-input"
                  type="email"
                  name="mail"
                  autoComplete="off"
                  className="border border-gray-300 w-full p-2 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="example@email.com"
                />
              </div>
              <div className="mb-4">
                <input
                  id="password-input"
                  type="password"
                  name="password"
                  className="border border-gray-300 w-full p-2 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="Password"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold w-full py-2 px-4 rounded mt-4 hover:bg-blue-600"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginModal;

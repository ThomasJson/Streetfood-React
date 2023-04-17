import React, { useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";
import doFetch from "../../helpers/fetchHelper";
import { AuthContext } from "../../contexts/AuthContext";
import { deleteCookie, setCookie } from "../../helpers/cookieHelper";

const LoginScreen = () => {
  const { setAuth } = useContext(AuthContext);

  const [valid, setValid] = useState({ email: false, password: false });

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
  return (
    <>
      <div className="bg-slate-200 min-h-82vh">
        <form
          onSubmit={handleSubmit}
          className=""
          noValidate
        >
          <input
            id="email-input"
            type="email"
            placeholder="Adresse e-mail"
            name="mail"
            autoComplete="off"
            // onInput={() => {
            //   const input = document.getElementById("email-input");
            //   input.classList.add("onInput");
            // }}
          />
          <input
            id="password-input"
            type="password"
            placeholder="Mot de passe"
            name="password"
            // onInput={() => {
            //   const input = document.getElementById("password-input");
            //   input.classList.add("onInput");
            // }}
          />
          <button type="submit" className="">
            Se connecter
          </button>
          <NavLink to="/">Mot de passe oublié ?</NavLink>
        </form>
      </div>
    </>
  );
};

export default LoginScreen;

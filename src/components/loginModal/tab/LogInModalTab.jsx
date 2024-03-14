import React, { useContext, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { ThemeContext } from '../../../contexts/ThemeContext';
import { AuthContext } from "../../../contexts/AuthContext";
import { deleteCookie, setCookie } from "../../../helpers/cookieHelper";
import { BiLogInCircle } from "react-icons/bi";

const LogInModalTab = ({ setShow }) => {

    const { t } = useTranslation();
    const { theme } = useContext(ThemeContext);
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

        if (!validForm(jsonData)) {
            return;
        }

        const baseUrl = process.env.REACT_APP_AUTH_API_BASE_URL;
        const url = `${baseUrl}/auth/login`;

        await fetch(url, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData),

        })
            .then(response => {

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();

            })
            .then(data => {

                if (data?.result) {

                    setAuth({ role: +data?.roleWeight, id: data?.accountId });
                    setCookie("StreetF", data?.token, { "max-age": 60 * 60 * 10 });
                    setShow(false);
                    navigate("/");

                } else {

                    if (data?.result === false) {
                        setErrorMessage("Incorrect email or password.");
                    }

                    setAuth({ role: 0, id: "0" });
                    deleteCookie("StreetF");
                }

            })
            .catch(e => {

                // console.log(e);
            });

    }

    return (
        <div className={`p-3 rounded-lg ${theme.bgTertiary}`}>
            <form
                className="w-full flex flex-col"
                onSubmit={handleSubmit}
                noValidate
            >
                <div className="w-full mt-2">
                    <label htmlFor="email-input" className={`${theme.label}`}>
                        {t('modal.mail')}
                    </label>
                    <input
                        id="email-input"
                        type="email"
                        name="mail"
                        autoComplete="off"
                        className={`border border-gray-300 w-full p-2 focus:outline-none ${theme.text} ${theme.bgSecondary}`}
                        placeholder="exemple@gmail.com"
                    />
                </div>

                {!valid.email && (
                    <p className="text-red-400 text-sm">
                        {t('modal.validEmail')}
                    </p>
                )}

                <div className="mt-2 w-full">
                    <label htmlFor="password-input" className={`${theme.label}`}>
                        {t('modal.password')}
                    </label>
                    <input
                        id="password-input"
                        type="password"
                        name="password"
                        className={`border border-gray-300 w-full p-2 focus:outline-none ${theme.text} ${theme.bgSecondary}`}
                        placeholder="••••••"
                    />
                </div>

                {!valid.password && (
                    <p className="text-red-400 text-sm">
                        {t('modal.validPw')}
                    </p>
                )}

                <p className="text-red-400 text-sm italic">{errorMessage}</p>

                {/* <div className={`text-center mt-2 mb-3 ${theme.label}`}>
                    {t('modal.forgotPw')}
                </div> */}

                <button
                    type="submit"
                    onClick={() => setErrorMessage("")}
                    className="font-Rubik p-2 mb-1 mt-4 w-full flex flex-row items-center justify-center bg-green-600 hover:bg-green-500 active:bg-green-700 rounded-lg"
                >
                    <div className="flex flex-row items-center">
                        <BiLogInCircle className="text-2xl text-white" />
                        <span className="ml-1 text-white">
                            {t('generic.login')}
                        </span>
                    </div>
                </button>

            </form>
        </div>
    );
};

export default LogInModalTab;
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
    const [ valid, setValid ] = useState({ email: true, password: true });
    const [ errorMessage, setErrorMessage ] = useState("");

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

        console.log(data)

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

        console.log(e);
        });

    }

    return (
        <div className="p-3 mx-2 bg-gray-50">
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
    );
};

export default LogInModalTab;
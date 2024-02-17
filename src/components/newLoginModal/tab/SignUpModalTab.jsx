import React, { useContext, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useForm } from "react-hook-form";
import { FiUserPlus } from "react-icons/fi";
import { ThemeContext } from '../../../contexts/ThemeContext';

const SignUpModalTab = () => {

    const { t } = useTranslation();
    const { theme } = useContext(ThemeContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const formInvalid = () => console.log("Errors", errors);

    const [msg, setMsg] = useState("");

    const formSubmit = async (formData) => {

        const baseUrl = process.env.REACT_APP_AUTH_API_BASE_URL;
        const url = `${baseUrl}/auth/register`;

        await fetch(url, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),

        }).then(data => {
            console.log(data);

            if (data.statusText === "OK") {
                setMsg("A confirmation email has been sent.");
            }

        })

    };

    const validPw = () => {
        return (
            document.getElementById("password-input").value ===
            document.getElementById("confirm-input").value
        );
    };

    return (
        <>
            <form
                className={`p-3 flex flex-col w-full rounded-lg ${theme.bgSecondary}`}
                onSubmit={handleSubmit(formSubmit, formInvalid)}
                noValidate
            >

                <div className="flex flex-col sm:flex-row sm:justify-between lg:flex-row lg:justify-between">

                    <div className="mt-2 w-49">
                        <label htmlFor="firstName-input" className="text-gray-500">
                            First Name <span className="text-red-400">*</span>
                        </label>
                        <input
                            id="firstName-input"
                            className="border border-gray-300 w-full p-2 focus:outline-none text-gray-600"
                            type="text"
                            placeholder="John"
                            name="firstName"
                            autoComplete="off"
                            {...register("firstName", { required: true, minLength: 3 })}
                        />
                        {errors.firstName && (
                            <p className="text-red-400">First Name is required.</p>
                        )}
                    </div>

                    <div className="mt-2 w-49">
                        <label htmlFor="pseudo-input" className="text-gray-500">
                            Pseudo <span className="text-red-400">*</span>
                        </label>
                        <input
                            id="pseudo-input"
                            className="border border-gray-300 w-full p-2 focus:outline-none text-gray-600"
                            type="text"
                            placeholder="Rocket78"
                            name="pseudo"
                            autoComplete="off"
                            {...register("pseudo", { required: true, minLength: 3 })}
                        />
                        {errors.pseudo && (
                            <p className="text-red-400">Pseudo is required.</p>
                        )}
                    </div>

                </div>

                <div className="mt-2 w-full">
                    <label htmlFor="mailAdress-input" className="text-gray-500">
                        Email Adress <span className="text-red-400">*</span>
                    </label>
                    <input
                        id="mailAdress-input"
                        className="border border-gray-300 w-full p-2 focus:outline-none text-gray-600"
                        type="email"
                        placeholder="exemple@gmail.com"
                        name="mail"
                        autoComplete="off"
                        {...register("mail", {
                            required: true,
                            pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                        })}
                    />
                    {errors.mail && (
                        <p className="text-red-400">Valid email adress is required.</p>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between lg:flex-row lg:justify-between">
                    <div className="mt-2 w-49">
                        <label htmlFor="password-input" className="text-gray-500">
                            Password <span className="text-red-400">*</span>
                        </label>
                        <input
                            id="password-input"
                            className="border border-gray-300 w-full p-2 focus:outline-none text-gray-600"
                            type="text"
                            placeholder="••••••"
                            name="password"
                            autoComplete="off"
                            {...register("password", {
                                required: true,
                                regex: /^(?=.*[A-Z]).{6,}$/,
                            })}
                        />
                        {errors.password && (
                            <p className="text-red-400">Password is required.</p>
                        )}
                    </div>

                    <div className="mt-2 w-49">
                        <label htmlFor="confirm-input" className="text-gray-500">
                            Confirm Password <span className="text-red-400">*</span>
                        </label>
                        <input
                            id="confirm-input"
                            className="border border-gray-300 w-full p-2 focus:outline-none text-gray-600"
                            type="text"
                            placeholder="••••••"
                            autoComplete="off"
                            {...register("confirm", {
                                required: true,
                                regex: /^(?=.*[A-Z]).{6,}$/,
                                validate: validPw,
                            })}
                        />
                        <i className={"text-danger d-block"}>
                            {errors.confirm
                                ? "* must be the same as entered password"
                                : " "}
                        </i>
                    </div>

                </div>

                <button
                    type="submit"
                    className="font-Rubik p-2 mb-1 mt-4 w-full flex flex-row items-center justify-center bg-orange-500 hover:bg-orange-400 active:bg-orange-600 rounded-lg"
                >
                    <div className="flex flex-row items-center">
                        <FiUserPlus className="text-2xl text-white" />
                        <span className="ml-1 text-white">Create an account</span>
                    </div>
                </button>

            </form>

            {msg !== "" && (
                <div>{msg}</div>
            )}

        </>
    );
};

export default SignUpModalTab;
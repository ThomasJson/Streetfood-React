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

    const [isRegister, setIsRegister] = useState(null);

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
            setIsRegister(data.ok)

        })

    };

    return (
        <>
            <form
                className={`p-3 flex flex-col w-full rounded-lg ${theme.bgTertiary}`}
                onSubmit={handleSubmit(formSubmit, formInvalid)}
                noValidate
            >

                <div className="flex flex-row justify-between">

                    <div className="mt-2 w-49">
                        <label htmlFor="firstName-input" className={`${theme.label}`}>
                            {t('modal.firstName')} <span className="text-red-400">*</span>
                        </label>
                        <input
                            id="firstName-input"
                            className={`border border-gray-300 w-full p-2 focus:outline-none ${theme.text} ${theme.bgSecondary}`}
                            type="text"
                            placeholder="John"
                            name="firstName"
                            autoComplete="off"
                            {...register("firstName", { required: true, minLength: 3 })}
                        />
                        {errors.firstName && (
                            <p className="text-red-400 text-sm">
                                {t('modal.validName')}
                            </p>
                        )}
                    </div>

                    <div className="mt-2 w-49">
                        <label htmlFor="pseudo-input" className={`${theme.label}`}>
                            {t('modal.pseudo')} <span className="text-red-400">*</span>
                        </label>
                        <input
                            id="pseudo-input"
                            className={`border border-gray-300 w-full p-2 focus:outline-none ${theme.text} ${theme.bgSecondary}`}
                            type="text"
                            placeholder="Rocket78"
                            name="pseudo"
                            autoComplete="off"
                            {...register("pseudo", { required: true, minLength: 3 })}
                        />
                        {errors.pseudo && (
                            <p className="text-red-400 text-sm">
                                {t('modal.validPseudo')}
                            </p>
                        )}
                    </div>

                </div>

                <div className="mt-2 w-full">
                    <label htmlFor="mailAdress-input" className={`${theme.label}`}>
                        {t('modal.mail')} <span className="text-red-400">*</span>
                    </label>
                    <input
                        id="mailAdress-input"
                        className={`border border-gray-300 w-full p-2 focus:outline-none ${theme.text} ${theme.bgSecondary}`}
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
                        <p className="text-red-400 text-sm">
                            {t('modal.validEmail')}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="font-Rubik p-2 mb-1 mt-4 w-full flex flex-row items-center justify-center bg-orange-500 hover:bg-orange-400 active:bg-orange-600 rounded-lg"
                >
                    <div className="flex flex-row items-center">
                        <FiUserPlus className="text-2xl text-white" />
                        <span className="ml-1 text-white">
                            {t('generic.signUp')}
                        </span>
                    </div>
                </button>

            </form>

            <div className="flex flex-row w-full justify-center">
                {isRegister !== null && (
                    <div className={`pt-2 ${theme.text}`}>
                        {isRegister ? t('modal.registerResponseOk') : t('modal.registerResponseFail')}
                    </div>
                )}
            </div>
        </>
    );
};

export default SignUpModalTab;
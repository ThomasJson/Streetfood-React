import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useForm } from "react-hook-form";
import { FiUserPlus } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { FaUnlock } from "react-icons/fa";
import { IoKey } from "react-icons/io5";

const AccountValidateScreen = () => {


  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const { token } = useParams();
  const [createUserToken, setCreateUserToken] = useState();
  const [authResult, setAuthResult] = useState(null);
  const [countdown, setCountdown] = useState(10);

  const navigate = useNavigate();

  useEffect(() => {

    const baseUrl = process.env.REACT_APP_AUTH_API_BASE_URL;
    const url = `${baseUrl}/auth/validate`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: token }),
    })
      .then((resp) => resp.json())
      .then((json) => {

        setCreateUserToken(json);

      });

  }, []);

  useEffect(() => {
    if (authResult !== null && authResult.result) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 10000);

      const countdownTimer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => {
        clearTimeout(timer);
        clearInterval(countdownTimer);
      };
    }
  }, [authResult, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formInvalid = (errors) => console.log("Errors", errors);

  const formSubmit = async (formData) => {

    const payload = Object.assign({}, formData, createUserToken);

    const baseUrl = process.env.REACT_APP_AUTH_API_BASE_URL;
    const url = `${baseUrl}/auth/create`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    })
      .then((resp) => resp.json())
      .then((json) => {

        setAuthResult(json);

      });

  };

  const validPw = () => {

    return (
      document.getElementById("password-input").value ===
      document.getElementById("confirm-input").value
    );

  };

  return (
    <>

      {createUserToken !== null && (

        <div className='flex flex-col w-full h-full justify-center items-center'>

          <div className={`relative p-4 rounded-lg w-11/12 sm:max-w-lg mx-auto ${theme.bgPrimary}`}>

            <div className={`flex rounded-lg p-2 mb-4 ${theme.bgTertiary}`}>
              <h3 className={`flex flex-row justify-center items-center gap-1 w-full rounded-lg py-2.5 font-Rubik text-xl leading-5 ${theme.bgPrimary} ${theme.text}`}>
                
                {authResult !== null ? (

                  authResult.result ?
                    (<><FaUnlock /> <div>{authResult.message}</div></>)
                    :
                    (<><IoKey /> <div>{t('modal.password')}</div></>)
                )
                  :
                  (<><IoKey /> <div>{t('modal.password')}</div></>)
                }

              </h3>
            </div>

            <form
              noValidate
              className={`p-3 flex flex-col rounded-lg ${theme.bgTertiary}`}
              onSubmit={handleSubmit(formSubmit, formInvalid)}
            >
              <div className="flex flex-col justify-between">
                <div className="mt-2">
                  <label htmlFor="password-input" className={`${theme.label}`}>
                    {t('modal.password')} <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="password-input"
                    className={`border border-gray-300 w-full p-2 focus:outline-none ${theme.text} ${theme.bgSecondary}`}
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
                    <p className="text-red-400 text-sm">
                      {t('modal.validPw')}
                    </p>
                  )}
                </div>

                <div className="mt-2">
                  <label htmlFor="confirm-input" className={`${theme.label}`}>
                    {t('modal.confirmPw')} <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="confirm-input"
                    className={`border border-gray-300 w-full p-2 focus:outline-none ${theme.text} ${theme.bgSecondary}`}
                    type="text"
                    placeholder="••••••"
                    autoComplete="off"
                    {...register("confirm", {
                      required: true,
                      regex: /^(?=.*[A-Z]).{6,}$/,
                      validate: validPw,
                    })}
                  />
                  {errors.confirm && (
                    <p className="text-red-400 text-sm">
                      {t('modal.validConfirm')}
                    </p>
                  )}
                </div>

              </div>

              <button
                type="submit"
                className="font-Rubik p-2 mb-1 mt-4 w-full flex flex-row items-center justify-center bg-orange-500 hover:bg-orange-400 active:bg-orange-600 rounded-lg"
              >
                <div className="flex flex-row items-center">
                  <FiUserPlus className="text-2xl text-white" />
                  <span className="ml-1 text-white">
                    {t('modal.createAcc')}
                  </span>
                </div>
              </button>

            </form>

            <div className="flex flex-row w-full justify-center">
              {authResult !== null && (
                <div className={`pt-2 ${theme.text}`}>
                  {authResult.result ?
                    (<div>{t('modal.createAccOk')} {countdown}</div>)
                    :
                    (t('modal.createAccFail'))
                  }
                </div>
              )}
            </div>

          </div>

        </div>
      )}

    </>
  );
};

export default AccountValidateScreen;
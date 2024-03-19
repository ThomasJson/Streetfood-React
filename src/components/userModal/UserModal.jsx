import React, { useContext } from 'react';
import { Dialog } from '@headlessui/react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { AuthContext } from '../../contexts/AuthContext';
import { deleteCookie } from '../../helpers/cookieHelper';
import { useTranslation } from 'react-i18next';
import { NavLink } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { IoSettingsSharp } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const UserModal = ({ show, setShow }) => {

    const { theme } = useContext(ThemeContext);
    const { auth, setAuth } = useContext(AuthContext);
    const { t } = useTranslation();
    const closeModal = () => setShow(false);

    return (

        <Dialog open={show} onClose={closeModal} className="fixed z-10 inset-0 overflow-y-auto">

            <div className="flex items-center justify-center min-h-screen">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />

                <div className={`relative p-4 rounded-lg w-11/12 sm:max-w-sm mx-auto ${theme.bgPrimary}`}>

                    <div className={`flex flex-col gap-4`}>

                        {auth.role === 4 && (
                            <NavLink
                                to="/managerPanel"
                                className={`w-full`}
                                onClick={closeModal}>

                                <button className={`w-full flex justify-center gap-1 items-center p-2 rounded-lg ${theme.bgTertiary} ${theme.text} ${theme.textHover} hover:bg-yellow-500`}>
                                    <MdOutlineAdminPanelSettings  className={`text-2xl `} />
                                    <span className='font-medium'>{t('userModal.admin')}</span>
                                </button>

                            </NavLink>
                        )}

                        <NavLink
                            to="/account"
                            className="w-full"
                            onClick={closeModal}
                        >
                            <button className={`w-full flex justify-center gap-1 items-center p-2 rounded-lg ${theme.bgTertiary} ${theme.text} ${theme.textHover} hover:bg-blue-500`}>
                                <AiOutlineUser className={`text-2xl `} />
                                <span className='font-medium'>{t('userModal.myAccount')}</span>
                            </button>
                        </NavLink>

                        <NavLink
                            to="/settings"
                            className="w-full"
                            onClick={closeModal}
                        >
                            <button className={`w-full flex justify-center gap-1 items-center p-2 rounded-lg ${theme.bgTertiary} ${theme.text} ${theme.textHover} hover:bg-orange-400`}>
                                <IoSettingsSharp className={`text-xl `} />
                                <span className='font-medium'>{t('userModal.settings')}</span>
                            </button>
                        </NavLink>

                        {auth.role > 0 && (
                            <button
                                className={`w-full flex justify-center gap-1 items-center p-2 rounded-lg ${theme.bgTertiary} ${theme.text} ${theme.textHover} hover:bg-red-500`}
                                onClick={(e) => {
                                    setAuth({ role: 0, id: "0" });
                                    deleteCookie("StreetF");
                                    window.location.href = "/";
                                }}
                            >
                                <BiLogOut className={`text-2xl `} />
                                <span className='font-medium'>{t('userModal.logOut')}</span>
                            </button>
                        )}

                    </div>
                </div>
            </div>
        </Dialog>

    );

};

export default UserModal;
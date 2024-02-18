import React, { useContext } from 'react';
import { Dialog, Tab } from '@headlessui/react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import SignUpModalTab from './tab/SignUpModalTab';
import LogInModalTab from './tab/LogInModalTab';
import { BiLogInCircle } from "react-icons/bi";
import { FiUserPlus } from "react-icons/fi";

const LoginModal = ({ show, setShow }) => {

  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const closeModal = () => setShow(false);

  return (

    <Dialog open={show} onClose={closeModal} className={`fixed z-10 inset-0 overflow-y-auto`}>
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className={`relative p-4 rounded-lg w-11/12 sm:max-w-2xl mx-auto ${theme.bgPrimary}`}>
          
          <Tab.Group>

            <Tab.List className={`flex space-x-1 rounded-lg p-2 mb-4 ${theme.bgTertiary}`}>
              <Tab as={React.Fragment}>
                {({ selected }) => (
                  <button
                    className={`flex flex-row justify-center items-center gap-1 w-full rounded-lg py-2.5 text-sm font-medium leading-5 ${selected ? `${theme.bgPrimary} ${theme.text}` : `${theme.bgHover} ${theme.text}`}`}
                  >
                    <BiLogInCircle className={`text-2xl ${theme.text}`} />
                    {t('generic.login')}
                  </button>
                )}
              </Tab>

              <Tab as={React.Fragment}>
                {({ selected }) => (
                  <button
                    className={`flex flex-row justify-center gap-1 w-full rounded-lg py-2.5 text-sm font-medium leading-5 ${selected ? `${theme.bgPrimary} ${theme.text}` : `${theme.bgHover} ${theme.text}`}`}
                  >
                    <FiUserPlus className={`text-2xl ${theme.text}`} />
                    {t('generic.signup')}
                  </button>
                )}
              </Tab>
            </Tab.List>

            <Tab.Panels className="mt-2">
              <Tab.Panel>
                <LogInModalTab setShow={setShow} />
              </Tab.Panel>
              <Tab.Panel>
                <SignUpModalTab setShow={setShow} />
              </Tab.Panel>
            </Tab.Panels>

          </Tab.Group>

        </div>
      </div>
    </Dialog>
  );
};

export default LoginModal;
import React, { useContext } from 'react';
import { Dialog, Tab } from '@headlessui/react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import SignUpModalTab from './tab/SignUpModalTab';
import LogInModalTab from './tab/LogInModalTab';

const LoginModal = ({ show, setShow }) => {

  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const closeModal = () => setShow(false);

  return (

    <Dialog open={show} onClose={closeModal} className={`fixed z-10 inset-0 overflow-y-auto ${theme.modal}`}>
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg max-w-lg mx-auto">
          
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
              <Tab as={React.Fragment}>
                {({ selected }) => (
                  <button
                    className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 ${selected ? 'bg-white dark:bg-gray-700 shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`}
                  >
                    {t('generic.login')}
                  </button>
                )}
              </Tab>
              <Tab as={React.Fragment}>
                {({ selected }) => (
                  <button
                    className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 ${selected ? 'bg-white dark:bg-gray-700 shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`}
                  >
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
import './contextSettings.scss'
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../contexts/ThemeContext';
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

const ContextSettings = () => {

    const { i18n } = useTranslation();
    const { theme, changeThemeTo } = useContext(ThemeContext);
    const [ changeTheme, setChangeTheme ] = useState(theme.name === 'dark');
    const [ isThai, setIsThai ] = useState(i18n.language === 'th');

    useEffect(() => {
    }, [changeTheme])

    const handleChangeTheme = () => {
        setChangeTheme(previousValue => !previousValue);
        changeThemeTo(changeTheme ? 'light' : 'dark');
    }
    
    const toggleLanguage = () => {
        const newLanguage = isThai ? 'en' : 'th';
        i18n.changeLanguage(newLanguage);
        setIsThai(!isThai);
    };

    return (
        <div className='flex flex-row gap-4'>

            <div className='flex flex-row items-center gap-1'>
                <IoSunnyOutline className={`${theme.text}`}/>
                <label className="switch">
                    <input type="checkbox" checked={changeTheme} onChange={handleChangeTheme} />
                    <span className="slider round"></span>
                </label>
                <IoMoonOutline className={`${theme.text}`}/>
            </div>

            <div className='flex flex-row items-center gap-1'>
                <img src='/assets/img/en.png' alt='English' style={{width: '17px', height: '17px'}} />
                <label className="switch">
                    <input type="checkbox" checked={isThai} onChange={toggleLanguage} />
                    <span className="slider round"></span>
                </label>
                <img src='/assets/img/th.png' alt='Thai' style={{width: '17px', height: '17px'}} />
            </div>

        </div>
    );
};

export default ContextSettings;
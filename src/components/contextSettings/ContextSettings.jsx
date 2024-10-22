import './contextSettings.scss'
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../contexts/ThemeContext';
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

const ContextSettings = () => {

    const { i18n } = useTranslation();
    const { theme, changeThemeTo } = useContext(ThemeContext);
    const [ isDark, setIsDark ] = useState(theme.name === 'dark');
    const [ isThai, setIsThai ] = useState(i18n.language === 'th');

    // useEffect(() => {
    // }, [isDark])

    const handleChangeTheme = () => {
        setIsDark(previousValue => !previousValue);
        changeThemeTo(isDark ? 'light' : 'dark');
    }

    // console.log(isDark)

    // const handleChangeTheme = () => {
    //     const newTheme = changeTheme ? 'dark' : 'light';
    //     changeThemeTo(newTheme);
    //     setChangeTheme(previousValue => !previousValue);
    // }
    
    const toggleLanguage = () => {
        const newLanguage = isThai ? 'en' : 'th';
        i18n.changeLanguage(newLanguage);
        setIsThai(!isThai);
    };

    return (
        <div className={`flex flex-row gap-4 py-1 px-2 rounded-l-lg ${theme.bgSecondary}`}>

            <div className='flex flex-row items-center gap-1'>
                <IoSunnyOutline className={`${theme.text} text-lg`}/>
                <label className="switch">
                    <input id='darkTheme' type="checkbox" checked={isDark} onChange={handleChangeTheme} />
                    <span className="slider round"></span>
                </label>
                <IoMoonOutline className={`${theme.text} text-lg`}/>
            </div>

            <div className='flex flex-row items-center gap-1'>
                <img src='/assets/img/en.png' alt='English' style={{width: '18px', height: '18px'}} />
                <label className="switch">
                    <input id='thaiTheme' type="checkbox" checked={isThai} onChange={toggleLanguage} />
                    <span className="slider round"></span>
                </label>
                <img src='/assets/img/th.png' alt='Thai' style={{width: '18px', height: '18px'}} />
            </div>

        </div>
    );
};

export default ContextSettings;
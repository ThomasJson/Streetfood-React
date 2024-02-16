import './contextSettings.scss'
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../contexts/ThemeContext';
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

const ContextSettings = () => {

    const { theme, changeThemeTo } = useContext(ThemeContext);
    const [ changeTheme, setChangeTheme ] = useState(theme.name === 'light');
    
    useEffect(() => {

    }, [changeTheme])

    const handleChangeTheme = () => {
        setChangeTheme(previousValue => !previousValue);
        changeThemeTo(!changeTheme ? 'dark' : 'light');
    }
    
    const { i18n } = useTranslation();

    const [isThai, setIsThai] = useState(i18n.language === 'th');

    const toggleLanguage = () => {
        const newLanguage = isThai ? 'en' : 'th';
        i18n.changeLanguage(newLanguage);
        setIsThai(!isThai);
    };

    return (
        <div className='flex flex-row'>
            <div className='flex flex-row items-center gap-1 mr-4'>
                <IoSunnyOutline className={`${theme.text}`}/>
                <label className="switch">
                    <input type="checkbox" checked={changeTheme} onChange={handleChangeTheme} />
                    <span className="slider round"></span>
                </label>
                <IoMoonOutline className={`${theme.text}`}/>
            </div>

            <div className='flex flex-row items-center gap-1'>
                En
                <label className="switch">
                    <input type="checkbox" checked={isThai} onChange={toggleLanguage} />
                    <span className="slider round"></span>
                </label>
                Th
            </div>
        </div>
    );
};

export default ContextSettings;
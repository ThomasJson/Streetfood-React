import './contextSettings.scss'
import React, { useContext, useEffect, useState } from 'react';
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

    return (
        <div className='flex flex-row items-center gap-1'>
            <IoSunnyOutline className={`${theme.text}`}/>
            <label className="switch">
                <input type="checkbox" checked={changeTheme} onChange={handleChangeTheme} />
                <span className="slider round"></span>
            </label>
            <IoMoonOutline className={`${theme.text}`}/>
        </div>
    );
};

export default ContextSettings;
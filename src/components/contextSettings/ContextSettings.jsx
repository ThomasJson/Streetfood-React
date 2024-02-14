import './contextSettings.scss'
import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

const ContextSettings = () => {

    const { theme, changeThemeTo } = useContext(ThemeContext);
    const [ changeTheme, setChangeTheme ] = useState(theme.name === 'dark');

    useEffect(() => {

    }, [changeTheme])

    const handleChangeTheme = () => {
        
        changeThemeTo(!changeTheme ? 'dark' : 'light');
        setChangeTheme(previousValue => !previousValue);
        
    }

    console.log(theme);
    console.log(changeTheme);

    return (
        <div>
            <label className="switch">
                <input type="checkbox" checked={changeTheme} onChange={handleChangeTheme} />
                <span className="slider round"></span>
            </label>
        </div>
    );
};

export default ContextSettings;
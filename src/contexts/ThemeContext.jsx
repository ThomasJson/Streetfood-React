import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const ThemeContext = React.createContext();

const ThemeContextProvider = (props) => {
    
  const [themes, setThemes] = useState({});
  const [theme, setTheme] = useState({});
  
  if(!localStorage.hasOwnProperty('usedTheme'))
    localStorage.setItem('usedTheme', 'dark');
  
  const changeThemeTo = (themeName) => {
    if(!themes[themeName] || themeName === theme.name)
      return;

    setTheme(themes[themeName]);
    localStorage.setItem('usedTheme', themeName);   
  }

  useEffect(() => {
    axios.get('/assets/themes/themes.json').then((res) => {
      for(const t in res.data){
        axios.get(`/assets/themes/${t}.json`).then(({data}) => {
          setThemes(previousValue => {
            previousValue[t] = data;
            return previousValue;
          });
        }).then(() => {
          const thm = themes[localStorage.getItem('usedTheme') ?? 'light'];
          
          if(thm)
            setTheme(thm)
        });
      }
    });
  }, [themes])
  
  return (<ThemeContext.Provider value={{theme, changeThemeTo}}>{props.children}</ThemeContext.Provider>)
}

export default ThemeContextProvider;
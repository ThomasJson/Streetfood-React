import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const ThemeContext = React.createContext();

const ThemeContextProvider = (props) => {
    
  const [themes, setThemes] = useState({});
  const [theme, setTheme] = useState({ name: 'light' });
  
  const changeThemeTo = (themeName) => {
    if(!themes[themeName] || themeName === theme.name)
      return;

    setTheme(themes[themeName]);
    localStorage.setItem('usedTheme', themeName);   
  }

  useEffect(() => {
    const loadThemes = async () => {
      try {
        const themesResponse = await axios.get('/assets/themes/themes.json');
        const themePromises = Object.keys(themesResponse.data).map(t => 
          axios.get(`/assets/themes/${t}.json`).then(({ data }) => ({ [t]: data }))
        );

        const themeObjects = await Promise.all(themePromises);
        const allThemes = themeObjects.reduce((acc, curr) => ({ ...acc, ...curr }), {});
        setThemes(allThemes);
        
        setInitialTheme(allThemes);
      } catch (error) {
        console.error('Error loading themes:', error);
      }
    };

    loadThemes();
  }, []);

  const setInitialTheme = (loadedThemes) => {
    const usedThemeName = localStorage.getItem('usedTheme') ?? 'light';
    const initialTheme = loadedThemes[usedThemeName];
    if (initialTheme) {
      setTheme(initialTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, changeThemeTo }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;
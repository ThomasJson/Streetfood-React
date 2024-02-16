import axios from 'axios';
import { useState, useEffect } from 'react';

const useLanguages = () => {
  
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    setError(false);
    
    const controller = new AbortController();
    
    axios.get('./assets/locales/locales.json', {signal: controller.signal})
    .then(({data}) => {
      for(let lang in data){
        setLanguages(prevValue => [...prevValue, {lang: lang, name: data[lang]}])
      }
    })
    .catch(err => {
      if(axios.isCancel(err))
        return;
    });
    
    return () => controller.abort();
  }, []);
  
  return { languages, loading, error };
};

export default useLanguages;
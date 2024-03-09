import { getCookie } from "../helpers/cookieHelper";

// Fetch to Auth-api
const doFetch = async (endpoint, options = {}) => {

  options.credentials = "include";

  options.headers = {
    ...options.headers,
    Authorization: getCookie("StreetF"),
    'Content-Type': 'application/json',
  };

  const baseUrl = process.env.REACT_APP_AUTH_API_BASE_URL;
  const url = `${baseUrl}${endpoint}`;

  console.log(url)

  let data = null, loading = true, error = null, text = null;
  
  try {
    const resp = await fetch(url, options);
    text = await resp.text();
    loading = false;
    
    try {
      data = JSON.parse(text);
    } catch (e) {
      error = e;
    }

  } catch (e) {
    error = e;
    console.error("doFetch error:", e);

  } finally {

    loading = false;
  }

  return { data, loading, error, text };
  
};

export default doFetch;
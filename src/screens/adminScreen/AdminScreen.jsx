import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from '../../contexts/ThemeContext';
import { getCookie } from "../../helpers/cookieHelper";

const AdminScreen = () => {

  const [title, setTitle] = useState("");
  const [titleTh, setTitleTh] = useState("");
  const [content, setContent] = useState("");
  const [contentTh, setContentTh] = useState("");
  const [src, setSrc] = useState("");
  const [alt, setAlt] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [isNew, setIsNew] = useState(false);
  const [isBestSellers, setIsBestSellers] = useState(false);
  const [isBestOffers, setIsBestOffers] = useState(false);

  const [resultMsg, setResultMsg] = useState("");

  const { theme } = useContext(ThemeContext);

  const [categories, setCategories] = useState([]);

  useEffect(() => {

    const fetchCategories = async () => {

      try {

        const baseUrl = process.env.REACT_APP_REST_API_BASE_URL;
        const url = `${baseUrl}/category`;

        const response = await fetch(url);
        const result = await response.json();

        if (Array.isArray(result)) {
          setCategories(result);
        }

        else {
          console.error("The API response data is not an array :", result);
          setCategories([]);
        }

      } catch (error) {
        console.error("Error fetching categories :", error);
        setCategories([]);

      }

    };

    fetchCategories();

  }, []);

  const submitForm = async () => {

    if (!title || !content || !src || !categoryId) return;

    const selectedCategory = categories.find(
      (cat) => cat.id === categoryId
    );

    const requestBody = {
      title,
      titleTh,
      content,
      contentTh,
      price,
      stock,
      isNew,
      isBestOffers,
      isBestSellers,
      src: `/assets/img/${selectedCategory.title}/${src}`,
      alt,
      categoryId,
    };

    try {

      const baseUrl = process.env.REACT_APP_REST_API_BASE_URL;
      const url = `${baseUrl}/admin/product/insert`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getCookie("StreetF")

        },
        body: JSON.stringify(requestBody),
      });

      await response.json();
      setResultMsg("Product added successfully.")

    } catch (error) {
      setResultMsg("Error adding the product.")

    }

  };

  return (
    <>
      <div className={`flex flex-col w-full p-4 shadow-md rounded ${theme.bgPrimary} ${theme.text}`}>

        <form
          className="flex flex-col gap-2"
          onSubmit={async (e) => {
            e.preventDefault();
            await submitForm();
            setTitle("");
            setTitleTh("");
            setContent("");
            setContentTh("");
            setSrc("");
            setAlt("");
            setCategoryId("");
            setPrice(0);
            setStock(0);
            setIsNew(false);
            setIsBestSellers(false)
            setIsBestOffers(false);
          }}
        >

          <div className="flex items-center justify-between">
            <h2 className={`text-2xl mb-4`}>Add new Product</h2>
            <div className="flex flex-row gap-2">
              <div>{resultMsg}</div>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit">
                Add
              </button>
            </div>
          </div>

          <div className="flex flex-col w-full lg:flex-row justify-between">
            <div className="lg:w-49">
              <label
                className={`block mb-1 ${theme.label}`}
                htmlFor="title"
              >
                Title :
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline ${theme.bgSecondary}`}
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="lg:w-49">
              <label
                className={`block mb-1 ${theme.label}`}
                htmlFor="titleTh"
              >
                Thai Title :
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline ${theme.bgSecondary}`}
                id="titleTh"
                type="text"
                value={titleTh}
                onChange={(e) => setTitleTh(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col w-full lg:flex-row justify-between">
            <div className="lg:w-49">
              <label
                className={`block mb-1 ${theme.label}`}
                htmlFor="content"
              >
                Content :
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline ${theme.bgSecondary}`}
                id="content"
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="lg:w-49">
              <label
                className={`block mb-1 ${theme.label}`}
                htmlFor="contentTh"
              >
                Thai Content :
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline ${theme.bgSecondary}`}
                id="contentTh"
                type="text"
                value={contentTh}
                onChange={(e) => setContentTh(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col w-full lg:flex-row justify-between">
            <div className="lg:w-49">
              <label
                className={`block mb-1 ${theme.label}`}
                htmlFor="src"
              >
                File Name :
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline ${theme.bgSecondary}`}
                id="src"
                type="text"
                value={src}
                onChange={(e) => setSrc(e.target.value)}
              />
            </div>
            <div className="lg:w-49">
              <label
                className={`block mb-1 ${theme.label}`}
                htmlFor="alt"
              >
                Alt text :
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline ${theme.bgSecondary}`}
                id="alt"
                type="text"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col w-full lg:flex-row justify-between">
            <div className="lg:w-16%">

              <label
                className={`block mb-1 ${theme.label}`}
                htmlFor="category"
              >
                Category :
              </label>

              <select
                className={`shadow appearance-none border rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline ${theme.bgSecondary}`}
                id="category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                {categories.map((cat) => (

                  <option key={cat.id} value={cat.id}>
                    {cat.title}
                  </option>

                ))}
              </select>
            </div>

            <div className="lg:w-16%">
              <label
                className={`block mb-1 ${theme.label}`}
                htmlFor="price"
              >
                Price :
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline ${theme.bgSecondary}`}
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>

            <div className="lg:w-16%">
              <label
                className={`block mb-1 ${theme.label}`}
                htmlFor="stock"
              >
                Stock :
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline ${theme.bgSecondary}`}
                id="stock"
                type="number"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>

            <div className={`lg:w-16% flex justify-center items-center gap-2 mt-7 border border-gray-300 rounded ${theme.bgSecondary}`}>
              <label htmlFor="isNew" className={`block mb-1 ${theme.label}`}>
                Is New
              </label>
              <input
                className={`form-checkbox h-5 w-5 text-blue-600  focus:ring-blue-500`}
                id="isNew"
                type="checkbox"
                checked={isNew}
                onChange={(e) => setIsNew(e.target.checked)}
              />
            </div>

            <div className={`lg:w-16% flex justify-center items-center gap-2 mt-7 border border-gray-300 rounded ${theme.bgSecondary}`}>
              <label htmlFor="isBestOffers" className={`block mb-1 ${theme.label}`}>
                Is Best Offer
              </label>
              <input
                className={`form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500`}
                id="isBestOffers"
                type="checkbox"
                checked={isBestOffers}
                onChange={(e) => setIsBestOffers(e.target.checked)}
              />
            </div>

            <div className={`lg:w-16% flex justify-center items-center gap-2 mt-7 border border-gray-300 rounded ${theme.bgSecondary}`}>
              <label htmlFor="isBestSellers" className={`block mb-1 ${theme.label}`}>
                Is Best Sellers
              </label>
              <input
                className={`form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500`}
                id="isBestSellers"
                type="checkbox"
                checked={isBestSellers}
                onChange={(e) => setIsBestSellers(e.target.checked)}
              />
            </div>

          </div>

        </form>
      </div>
    </>
  );
};

export default AdminScreen;
import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from '../../contexts/ThemeContext';

const AdminScreen = () => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [src, setSrc] = useState("");
  const [alt, setAlt] = useState("");
  const [categoryId, setCategoryId] = useState("");
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
      content,
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
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      console.log("Product added successfully:", result);

    } catch (error) {
      console.error("Error adding product:", error);

    }

  };

  return (
    <>
      <div className={`flex flex-col lg:w-1/3 p-4 m-4 shadow-md rounded ${theme.bgPrimary} ${theme.text}`}>

        <h2 className={`text-2xl mb-4`}>Add new Product</h2>

        <form
          className="flex flex-col gap-2"
          onSubmit={async (e) => {
            e.preventDefault();
            await submitForm();
            setTitle("");
            setContent("");
            setSrc("");
            setAlt("");
            setCategoryId("");
          }}
        >
          <div>
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
          <div>
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
          <div>
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
          <div>
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
          <div>
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
              <option value="">Select one Category</option>
              {categories.map((cat) => (

                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>

              ))}
            </select>

          </div>
          <div className="flex items-center justify-end mt-4">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminScreen;
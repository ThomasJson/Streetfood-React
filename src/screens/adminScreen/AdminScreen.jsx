import React, { useState, useEffect } from "react";

const AdminScreen = () => {
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [src, setSrc] = useState("");
  const [alt, setAlt] = useState("");
  const [categoryId, setCategoryId] = useState("");

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
      <div className="bg-gray-50 min-h-84vh">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
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
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Titre:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="content"
            >
              Contenu:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="content"
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="src"
            >
              Chemin image:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="src"
              type="text"
              value={src}
              onChange={(e) => setSrc(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="alt"
            >
              Texte alternatif de l'image :
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="alt"
              type="text"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="category"
            >
              Catégorie:
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((cat) => (

                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>

              ))}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminScreen;
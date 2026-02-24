import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProductPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [thumbnail, setThumbnail] = useState("");

  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // 📦 CATEGORY FETCH
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  // 🚀 SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ VALIDATION
    if (!title  || !category || !price) {
      alert("Barcha maydonlarni to‘ldir!");
      return;
    }

    setLoading(true);

    const newProduct = {
      id: Date.now(), // local ID
      title,
      category,
      price,
      stock,
      thumbnail,
    };

    try {
      // fake API (optional)
      await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      // 💾 LOCAL STORAGE SAVE
      const existing = JSON.parse(localStorage.getItem("products") || "[]");

      localStorage.setItem(
        "products",
        JSON.stringify([newProduct, ...existing])
      );

      // 🔄 redirect
      navigate("/products");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
  <div className=" flex  bg-gray-100 dark:bg-slate-900 p-4">
    <div className=" w-full bg-white dark:bg-slate-800 rounded-xl shadow-md border border-gray-200 dark:border-slate-700 p-6">
      
      <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-6">
        Add Product
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-slate-50 dark:bg-slate-800">

        {/* Title */}
        <div>
          <label className="text-sm text-gray-600 dark:text-slate-300 bg-white dark:bg-slate-800">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter product title"
            className="mt-1 w-full px-4 py-2.5 rounded-xl text-slate-400 dark:text-slate-200 bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-sm text-gray-600 dark:text-slate-300 bg-white dark:bg-slate-800">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full px-4 py-2.5 rounded-xl text-slate-400 dark:text-slate-200 bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select category</option>
            {categories.map((cat: any) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price + Stock */}
        <div className="grid grid-cols-2 gap-10">
          <div>
            <label className="text-sm text-gray-600 dark:text-slate-300 bg-white dark:bg-slate-800">
              Price
            </label>
            <input
              type="number"
              placeholder="0"
              className="mt-1 w-full px-4 py-2.5 rounded-xl text-slate-400 dark:text-slate-200 bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 outline-none"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 dark:text-slate-300 bg-white dark:bg-slate-800">
              Stock
            </label>
            <input
              type="number"
              placeholder="0"
              className="mt-1 w-full px-4 py-2.5 rounded-xl text-slate-400 dark:text-slate-200 bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 outline-none"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Thumbnail */}
        <div>
          <label className="text-sm text-gray-600 dark:text-slate-300 bg-white dark:bg-slate-800">
            Thumbnail URL
          </label>
          <input
            type="url"
            placeholder="https://example.com/image.jpg"
            className="mt-1 w-full px-4 py-2.5 rounded-xl text-slate-400 dark:text-slate-200 bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 outline-none"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-4 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 transition"
        >
          {loading ? "Loading..." : "Add Product"}
        </button>

      </form>
    </div>
  </div>
);

  
}

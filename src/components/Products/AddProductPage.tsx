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
    <div className="w-full min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 px-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-[400px]">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-white">
          Add Product
        </h2>
        {/* Inputla */}
        <input
          type="text"
          placeholder="Title"
          className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 
      border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white 
      placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* Select */}
        <select
          value={category}
          className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 
      border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white 
      placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select category</option>
          {categories.map((category: any) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>))}
        </select>
        <input
          type="number"
          placeholder="Stock"
          className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 
        border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white 
        placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Price"
          className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 
        border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white 
        placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <input
          type="url"
          placeholder="https://example.com"
          className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 
        border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white 
     placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />

        {loading ? (
          <p className="text-center text-white">Loading...</p>
        ) : (
          <button
            type="submit"
            className="mt-2 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-500 to-purple-600"
          >
            Add Product
          </button>
        )}
      </form>
    </div>
  );
}

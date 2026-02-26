import { Plus } from "lucide-react";
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
    if (!title || !category || !price) {
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
    <div className=" flex  p-4 ">
      <div className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-bl-2xl border border-slate-200/50 dark:border-slate-700/50 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
          <div className="flex items-center justify-between p-2">
            <div className="w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-white">
                Add Product
              </h2>
            </div>

            <button
              onClick={() => navigate("/addproductpage")}
              className="hidden lg:flex items-center space-x-2 px-4 py-2
        bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl
        hover:shadow-lg transition">
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          </div>
          <div>
            <label className="text-sm text-slate-950 dark:text-slate-300 bg-white dark:bg-slate-800">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter product title"
              className="peer block w-full rounded-md border border-gray-300 bg-white py-3 px-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-10">
            <div>
              <label className="text-sm text-slate-950 dark:text-slate-300 bg-white dark:bg-slate-800">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="peer block w-full rounded-md border border-gray-300 bg-white py-3 px-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <option value="">Select category</option>
                {categories.map((cat: any) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-950 dark:text-slate-300 bg-white dark:bg-slate-800">
                Thumbnail URL
              </label>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                className="peer  w-full rounded-md border border-gray-300 bg-white py-3 px-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
              />
            </div>
          </div>


          {/* Price + Stock */}
          <div className="grid grid-cols-2 gap-10">
            <div>
              <label className="text-sm text-slate-950 dark:text-slate-300 bg-white dark:bg-slate-800">
                Price
              </label>
              <input
                type="number"
                placeholder="0"
                className="peer  w-full rounded-md border border-gray-300 bg-white py-3 px-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
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
                className="peer  w-full rounded-md border border-gray-300 bg-white py-3 px-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Thumbnail */}

        </form>
      </div>
    </div>
  );

} 
import { useState, useEffect } from "react";
import { Search, MoreVertical } from "lucide-react";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  date?: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) throw new Error("Serverda xatolik yuz berdi");
        const data = await response.json();
        setProducts(data.products || []);
      } catch (err: any) {
        console.error(err.message || "Noma'lum xatolik");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
        Product List
      </h1>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-md mx-6">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl
              bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700
              text-slate-800 dark:text-white placeholder-slate-500
              focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>
        </div>

        <button
          className="hidden lg:flex items-center px-5 py-2
          bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl
          hover:shadow-lg transition"
        >
          Add Product
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 dark:bg-slate-800">
            <tr className="text-black dark:text-slate-200">
              <th className="p-3 text-left"><input type="checkbox" /></th>
              <th className="p-3 text-left">Product Name</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                className="border-t border-slate-200 dark:border-slate-700"
              >
                <td className="p-3"><input type="checkbox" /></td>

                <td className="p-3 flex items-center gap-3">
                  <img
                    src={p.thumbnail || p.images?.[0] || "https://via.placeholder.com/48"}
                    alt={p.title}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-black dark:text-white">{p.title}</p>
                    <p className="text-xs text-slate-500">{p.category}</p>
                  </div>
                </td>

                <td className="p-3 text-black dark:text-white">
                  {p.date || "-"}
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                        ${p.stock > 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}
                  >
                    {p.stock > 0 ? "Stock" : "Out Of Stock"}
                  </span>
                </td>

                <td className="p-3 text-black dark:text-white">
                  ${p.price}
                </td>

                <td className="p-3">
                  <MoreVertical size={18} className="text-black dark:text-white" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex justify-end items-center gap-4 text-sm text-black dark:text-white mt-4">
        <span>Items per page:</span>
        <select className="border rounded-lg px-2 py-1">
          <option>5</option>
          <option>10</option>
          <option>20</option>
        </select>
        <span>
          1 – {products.length} of {products.length}
        </span>
        <button className="px-2 border rounded hover:bg-gray-200 dark:hover:bg-gray-700">&lt;</button>
        <button className="px-2 border rounded hover:bg-gray-200 dark:hover:bg-gray-700">&gt;</button>
      </div>
    </div>
  );
}

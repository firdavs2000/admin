import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Search from "../../ui/Search";
import { useProducts } from "../../services/api";
import Paginate from "../../pages/Pagination";
import { Plus } from "lucide-react";

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // URL params
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";

  // 🔥 Local state (debounce uchun)
  const [searchValue, setSearchValue] = useState(search);

  // 🔥 Debounce (500ms)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchParams({
        page: "1",
        search: searchValue,
        limit: limit.toString(),
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchValue]);

  // API
  const { data, isLoading } = useProducts({
    page,
    limit,
    search,
  });

  const totalPages = Math.ceil((data?.total || 0) / limit);

  // Pagination
  const handlePage = (value: number) => {
    setSearchParams({
      page: value.toString(),
      search,
      limit: limit.toString(),
    });
  };

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden p-6">

      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Product List
      </h1>

      {/* Header */}
      <div className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">

        {/* Search */}
        <div className="w-full max-w-md">
          <Search search={searchValue} setSearch={setSearchValue} />
        </div>

        {/* Add Button */}
        <button
          onClick={() => navigate("/addproductpage")}
          className="hidden lg:flex items-center space-x-2 px-4 py-2
          bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl
          hover:shadow-lg transition"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add Product</span>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-t border-gray-200 dark:border-slate-700">
        <table className="w-full text-sm">

          {/* Head */}
          <thead className="text-gray-500 text-xs uppercase">
            <tr>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Price</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={3} className="p-6 text-center text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : data?.products?.length ? (
              data.products.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-gray-50 dark:hover:bg-slate-700 transition"
                >
                  {/* Product */}
                  <td className="p-4 flex items-center gap-3 ">

                    <div className="p-[2px] rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
                      <img
                        src={
                          p.thumbnail ||
                          p.images?.[0] ||
                          "https://via.placeholder.com/48"
                        }
                        alt={p.title}
                        className="w-12 h-12 rounded-full object-cover bg-white"
                      />
                    </div>

                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {p.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {p.category}
                      </p>
                    </div>
                  </td>


                  {/* Status */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${p.stock > 0
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-500"
                        }`}
                    >
                      {p.stock > 0 ? "Stock" : "Out Of Stock"}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="p-4 font-medium text-gray-800 dark:text-white">
                    ${p.price}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-6 text-center text-gray-400">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="p-4 flex justify-between items-center border-t border-gray-200 dark:border-slate-700">
          <p className="text-sm text-gray-500">
            {page} / {totalPages || 1}
          </p>

          <Paginate
            totalPages={totalPages}
            currentPage={page}
            setParamPage={handlePage}
          />
        </div>
      </div>
    </div>
  );
}  
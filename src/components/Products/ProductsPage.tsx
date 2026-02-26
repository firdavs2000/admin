import { useNavigate, useSearchParams } from "react-router-dom";
import Search from "../../ui/Search";
import { useProducts } from "../../services/api";
import Paginate from "../../pages/Pagination";
import { Plus } from "lucide-react";

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";

  const { data } = useProducts({
    page,
    limit,
    search,
  });

  const totalPages = Math.ceil((data?.total || 0) / limit);

  const handleSearch = (value: string) => {
    setSearchParams({
      page: "1",
      search: value,
    });
  };

  const handlePage = (value: number) => {
    setSearchParams({
      page: value.toString(),
      search,
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 backdrop-blur-xl rounded-b-2xl border border-slate-200/50 dark:border-slate-700/50 p-6">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Product List
      </h1>

      {/* Header */}
      <div className="flex items-center justify-between  p-4 rounded-2xl shadow-sm border border-white dark:border-slate-700">
        <div className="w-full max-w-md">
          <Search search={search} setSearch={handleSearch} />
        </div>

        <button
    
        onClick={() => navigate("/addproductpage")}
        
        className="hidden lg:flex items-center space-x-2 px-4 py-2
        bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl
        hover:shadow-lg transition">
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add Product</span>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl  shadow-sm border border-white dark:border-slate-700">
        <table className="w-full text-sm">
          <thead className=" text-gray-500 text-xs uppercase">
            <tr>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Price</th>
            </tr>
          </thead>

          <tbody>
            {data?.products?.map((p) => (
              <tr
                key={p.id}
                className="border-t border-white dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition"
              >
                {/* Product */}
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={
                      p.thumbnail ||
                      p.images?.[0] ||
                      "https://via.placeholder.com/48"
                    }
                    alt={p.title}
                    className="w-12 h-12 rounded-full object-cover border border-white"
                  />

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
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      p.stock > 0
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
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="p-4 flex justify-between items-center border-t border-gray-200 dark:border-slate-700">
          <p className="text-sm text-gray-500">
            {page} / {totalPages}
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

import { useSearchParams } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import Search from "../../ui/Search";
import { useProducts } from "../../services/api";
// import Paginate from "../../pages/Pagination";

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const search = searchParams.get("search") || "";

  const { data, isLoading } = useProducts({
    page,
    limit: 10,
    search,
  });

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
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
        Product List
      </h1>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-md mx-6">
          <Search search={search} setSearch={handleSearch} />
        </div>

        <button className="hidden lg:flex px-5 py-2 bg-blue-500 text-white rounded-xl">
          Add Product
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 dark:bg-slate-800">
            <tr className="text-black dark:text-slate-200">
              <th className="p-3 text-left">
                <input type="checkbox" />
              </th>
              <th className="p-3 text-left">Product Name</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {data?.products?.map((p) => (
              <tr
                key={p.id}
                className="border-t border-slate-200 dark:border-slate-700"
              >
                <td className="p-3">
                  <input type="checkbox" />
                </td>

                <td className="p-3 flex items-center gap-3">
                  <img
                    src={
                      p.thumbnail ||
                      p.images?.[0] ||
                      "https://via.placeholder.com/48"
                    }
                    alt={p.title}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-black dark:text-white">
                      {p.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      {p.category}
                    </p>
                  </div>
                </td>

                <td className="p-3 text-black dark:text-white">
                  {p.date || "-"}
                </td>

                <td className="p-3">
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

                <td className="p-3 text-black dark:text-white">
                  ${p.price}
                </td>

                <td className="p-3">
                  <MoreVertical
                    size={18}
                    className="text-black dark:text-white"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {/* {data?.total && (
          <Paginate
            totalPages={Math.ceil(data.total / 10)}
            currenPage={page}
            setParamPage={handlePage}
          />
        )} */}
      </div>
    </div>
  );
}

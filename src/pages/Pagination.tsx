import ReactPaginate from "react-paginate";

const Paginate = ({ totalPages, currentPage, setParamPage }) => {
  return (
    <div className="flex items-center justify-end gap-4 mt-6">
      
      {/* Text */}
      <p className="text-sm text-gray-700 dark:text-gray-300">
        Page {currentPage} of {totalPages}
      </p>

      <ReactPaginate
        breakLabel="..."
        nextLabel="›"
        previousLabel="‹"
        pageCount={totalPages}
        forcePage={currentPage - 1}
        onPageChange={(selectedItem) =>
          setParamPage(selectedItem.selected + 1)
        }

        containerClassName="flex items-center gap-2"

        pageClassName="px-3 py-1 rounded-md text-sm cursor-pointer 
        text-gray-700 dark:text-gray-300 
        hover:bg-gray-200 dark:hover:bg-gray-700 transition"

        activeClassName="hidden lg:flex items-center space-x-2 px-4 py-2
        bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl
        hover:shadow-lg transition"

        previousClassName="px-2 py-1 cursor-pointer text-lg 
        text-gray-700 dark:text-gray-300 
        hover:text-green-500"

        nextClassName="px-2 py-1 cursor-pointer text-lg 
        text-gray-700 dark:text-gray-300 
        hover:text-green-500"

        disabledClassName="opacity-40 cursor-not-allowed"
      />
    </div>
  );
};

export default Paginate;

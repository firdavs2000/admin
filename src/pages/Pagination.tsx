import React from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";

interface Props {
  totalPages: number;
  currentPage: number;
  setParamPage: (value: number) => void;
}

const Paginate: React.FC<Props> = ({
  totalPages,
  currentPage,
  setParamPage,
}) => {
  const dispatch = useDispatch();

  const onPageChange = (event: { selected: number }) => {
    const selectedPage = event.selected + 1;
    setParamPage(selectedPage);
  };

  return (
    <div className="flex justify-center mt-6">
      <ReactPaginate
        previousLabel={"←"}
        nextLabel={"→"}
        breakLabel={"..."}
        pageCount={totalPages}
        forcePage={currentPage - 1}
        onPageChange={onPageChange}
        containerClassName="flex gap-2"
        pageClassName="px-3 py-1 border rounded-lg cursor-pointer"
        activeClassName="bg-blue-500 text-white"
        previousClassName="px-3 py-1 border rounded-lg cursor-pointer"
        nextClassName="px-3 py-1 border rounded-lg cursor-pointer"
        breakClassName="px-3 py-1"
      />
    </div>
  );
};

export default Paginate;

import React from "react";

interface PaginationProps {
  totalPages: number;
  handleClick: (page: number) => void;
  page: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  handleClick,
  page,
}) => {
  const pages = [...Array(totalPages).keys()].map((number) => number + 1);

  return (
    <div className="numbers space-x-5 hover:cursor-pointer">
      {pages.map((number) => (
        <a
          key={number}
          onClick={() => handleClick(number)}
          className={`${page === number && "actives"}`}
        >
          {number}
        </a>
      ))}
    </div>
  );
};

export default Pagination;

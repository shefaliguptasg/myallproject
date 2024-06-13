import React from "react";
// import { usePagination, DOTS } from "./usePagination";
import style from "./pagination.module.scss";
export interface IProps {
  onPageChange: any;
  pageCount: number;
  currentPage: number;
  className: string;
  pageNumber: number;
}
const Pagination: React.FC<IProps> = (props) => {
  const { onPageChange, pageCount, currentPage, pageNumber } = props;
  const paginationRange = Array.apply(null, Array(pageCount)).map(function (
    y,
    i
  ) {
    return i + 1;
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={`${style["pagination-container"]}`}>
      <li
        className={`${style["pagination-item"]} ${
          currentPage == 1 ? style["disabled"] : ""
        }`}
        onClick={onPrevious}
      >
        <div className={`${style["arrow"]} ${style["left"]}`} />
      </li>
      {paginationRange.map((pageNumber: number, index: number) => {
        return (
          <li
            key={index}
            className={`${style["pagination-item"]} ${
              pageNumber == currentPage ? style["selected"] : ""
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`${style["pagination-item"]} ${
          currentPage === lastPage ? style["disabled"] : ""
        }`}
        onClick={onNext}
      >
        <div className={`${style["arrow"]} ${style["right"]}`} />
      </li>
    </ul>
  );
};

export default Pagination;

import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { GrNext, GrPrevious } from "react-icons/gr";

export const Footer = ({
  currentPage,
  totalPages,
  onPageChange,
  showMore,
  setLoading,
  paginationPayload,
  setPageToken,
  setPaginationPayload,
}) => {
  const [isPrev, setIsPrev] = useState(false);
  const handlePreviousPage = () => {
    console.log(paginationPayload, "paaaa");
    setLoading(true);
    setPaginationPayload((prev) => {
      const newPreviousTokens = [...prev.prevPageToken];
      newPreviousTokens.splice(prev.currentPage - 1, 1);
      return {
        ...prev,
        currentPage: prev.currentPage - 1,
        prevPageToken: newPreviousTokens,
      };
    });
    setIsPrev(true);
    // if (currentPage > 1) {
    //     onPageChange(currentPage - 1);
    // }
  };

  const handleNextPage = () => {
    setLoading(true);
    setIsPrev(false);
    setPaginationPayload((prev) => {
      return {
        ...prev,
        prevPageToken: [...prev.prevPageToken, prev.nextPageToken],
        currentPage: prev.currentPage + 1,
      };
    });
    // if (currentPage < totalPages) {
    //     onPageChange(currentPage + 1);
    // }
  };
  useEffect(() => {
    if (isPrev) {
      showMore(
        paginationPayload.prevPageToken[paginationPayload.currentPage - 2]
      );
    } else {
      showMore(paginationPayload.nextPageToken);
    }
  }, [isPrev]);
  return (
    <div className="footer">
      <button className="footer-button">
        <GrPrevious></GrPrevious>
        <GrPrevious></GrPrevious>
      </button>
      <button
        className="footer-button"
        onClick={handlePreviousPage}
        // disabled={currentPage === 1}
      >
        <GrPrevious />{" "}
      </button>
      <span grassName="footer-page-info">
        Page {paginationPayload.currentPage} of {paginationPayload.total}
      </span>
      <button
        className="footer-button"
        onClick={handleNextPage}
        // disabled={currentPage === totalPages}
      >
        <GrNext />
      </button>
      <button className="footer-button">
        <GrNext />
        <GrNext />
      </button>
    </div>
  );
};

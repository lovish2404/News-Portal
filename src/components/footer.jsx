import React from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { useGlobalContext } from "../context";

export const Footer = ({ showMore, setLoading }) => {
  const { paginationPayload, setPaginationPayload, resetPayload } =
    useGlobalContext();
  const handlePreviousPage = () => {
    setLoading(true);
    showMore(
      paginationPayload.prevPageToken[paginationPayload.currentPage - 2]
    );
    setPaginationPayload((prev) => {
      const newPreviousTokens = [...prev.prevPageToken];
      newPreviousTokens.splice(prev.currentPage - 1, 1);
      return {
        ...prev,
        currentPage: prev.currentPage - 1,
        prevPageToken: newPreviousTokens,
      };
    });
  };

  const handleNextPage = () => {
    setLoading(true);
    showMore(paginationPayload.nextPageToken);
    setPaginationPayload((prev) => {
      return {
        ...prev,
        prevPageToken: [...prev.prevPageToken, prev.nextPageToken],
        currentPage: prev.currentPage + 1,
      };
    });
  };
  const handleFirstPage = () => {
    setLoading(true);
    showMore();
    resetPayload();
  };

  return (
    <div className="footer">
      <button
        className="footer-button"
        onClick={handleFirstPage}
        disabled={paginationPayload.currentPage === 1}
      >
        <GrPrevious></GrPrevious>
        <GrPrevious></GrPrevious>
      </button>
      <button
        className="footer-button"
        onClick={handlePreviousPage}
        disabled={paginationPayload.currentPage === 1}
      >
        <GrPrevious />{" "}
      </button>
      <span className="footer-page-info">
        Page {paginationPayload.currentPage} of {paginationPayload.total}
      </span>
      <button
        className="footer-button"
        onClick={handleNextPage}
        disabled={paginationPayload.currentPage === paginationPayload.total}
      >
        <GrNext />
      </button>
      <button className="footer-button" disabled={true}>
        <GrNext />
        <GrNext />
      </button>
    </div>
  );
};

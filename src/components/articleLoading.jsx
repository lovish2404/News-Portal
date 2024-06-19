import React from "react";

export const ArticleLoader = () => {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-thumbnail"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-thumbnail"></div>
      <div className="skeleton-line short"></div>
    </div>
  );
};

import React from "react";

export const Skeleton = () => {
  return (
    <div className="skeleton-grid">
      {[...Array(12)].map((_, index) => (
        <div className="skeleton-box" key={index}></div>
      ))}
    </div>
  );
};

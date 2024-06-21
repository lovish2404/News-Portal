import React from "react";
import { useGlobalContext } from "../context";
import { ArticleList } from "../components/articlesList";
import { useNavigate } from "react-router-dom";

export const Bookmarks = () => {
  const { saveList } = useGlobalContext();
  const navigate = useNavigate();
  const footer = false;
  const handleBack = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <>
      <header className="BookmarksTab">
        <button onClick={handleBack} className="goBackBtn">
          Home
        </button>
        <span>Your Saved Articles</span>
      </header>
      <ArticleList articlesList={saveList} footer={footer} />
    </>
  );
};

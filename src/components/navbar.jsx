import React from "react";
import { useGlobalContext } from "../context";
import { CiSearch } from "react-icons/ci";
import { Bars } from "./sidebarBtn";
import { FaBookmark } from "react-icons/fa6";
import { redirect, useNavigate } from "react-router-dom";
export const Navbar = ({ setPageToken, setArticleList, setLoading }) => {
  const { searchKeyword, setSearchKeyword, setFilters } = useGlobalContext();
  const navigate = useNavigate();
  //to handle search value dynamically
  function handleChange(e) {
    setSearchKeyword(e.target.value);
  }
  //to handle click on search
  const handleClick = (e) => {
    e.preventDefault();
    setPageToken("");
    setArticleList([]);
    setFilters([]);
    setLoading(true);
  };
  const redirectToSaved = () => {
    navigate("/bookmarks");
  };
  return (
    <div className="navbar">
      <Bars firstClass="sidebar-btn"></Bars>
      <button className="goToSaved" onClick={redirectToSaved}>
        <FaBookmark />
      </button>
      <form className="navbar-search">
        <input
          type="text"
          id="search"
          className="searchMain"
          onChange={handleChange}
          placeholder="Search"
          value={searchKeyword}
        ></input>
        <label htmlFor="search">
          <button type="submit" className="btn search" onClick={handleClick}>
            <CiSearch></CiSearch>
          </button>
        </label>
      </form>
      <p>News-Portal</p>
    </div>
  );
};

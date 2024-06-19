import React from "react";
import { useGlobalContext } from "../context";
import { CiSearch } from "react-icons/ci";
import { Bars } from "./sidebarBtn";
export const Navbar = ({
  fetchData,
  setPageToken,
  setArticleList,
  setLoading,
}) => {
  const { searchKeyword, setSearchKeyword } = useGlobalContext();

  //to handle search value dynamically
  function handleChange(e) {
    setSearchKeyword(e.target.value);
  }
  //to handle click on search
  const handleClick = (e) => {
    e.preventDefault();
    setPageToken("");
    setArticleList([]);
    setLoading(true);
  };
  return (
    <div className="navbar">
      <Bars firstClass="sidebar-btn"></Bars>
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

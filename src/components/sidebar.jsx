import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { useGlobalContext } from "../context";
import { categories } from "../categories";
import { Bars } from "./sidebarBtn";
export const Sidebar = ({ setPageToken }) => {
  const { filterList, setFilters, setIsMount } = useGlobalContext();
  const { sidebarOpen, setSidebarOpen } = useGlobalContext();
  const [msg, showMsg] = useState(false);

  //to update filterList
  function handler(e) {
    const val = e.target.getAttribute("name");

    if (e.target.classList.contains("active")) {
      setPageToken("");
      setIsMount(false);
      if (filterList.length == 1) {
        setIsMount(true);
      }
      setFilters((prev) => {
        return prev.filter((name) => {
          return name != val;
        });
      });
    } else {
      if (filterList.length >= 5) {
        showMsg(true);
        setTimeout(() => {
          showMsg(false);
        }, 3000);
        return;
      }
      setPageToken("");
      setFilters((prev) => {
        setIsMount(true);
        return [...prev, val];
      });
    }
  }

  //for closing sidebar when clicked outside sidebar area
  const ref = useRef();
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleClickOutside(event) {
    if (!ref.current.contains(event.target)) {
      setSidebarOpen(false);
    }
  }
  {
    return (
      <>
        <aside className={sidebarOpen ? "sidebar show" : "sidebar"} ref={ref}>
          <p id="errorMsg" className={`errorMsg ${msg ? "show" : ""}`}>
            Only 5 Filters Allowed
          </p>
          <Bars firstClass="inSidebar"></Bars>
          <div className="sidebarHeader">
            <h2>Filter</h2>
          </div>
          <ul className="filters">
            {categories.map((name) => {
              return (
                <div
                  onClick={handler}
                  className={`filter ${
                    filterList.includes(name) ? "active" : ""
                  }`}
                  key={name}
                  name={name}
                >
                  {name}
                </div>
              );
            })}
          </ul>
        </aside>
      </>
    );
  }
};

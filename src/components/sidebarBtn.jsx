import React from "react";
import { FaBars } from "react-icons/fa";
import { useGlobalContext } from "../context";
export const Bars = ({ firstClass }) => {
  const { sidebarOpen, setSidebarOpen } = useGlobalContext();
  return (
    <button
      className={firstClass}
      onClick={() => {
        setSidebarOpen(!sidebarOpen);
      }}
    >
      <FaBars className="sidebar-icon"></FaBars>
    </button>
  );
};

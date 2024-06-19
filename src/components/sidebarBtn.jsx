import React from "react";
import { BsFilterLeft } from "react-icons/bs";
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
      <BsFilterLeft className="sidebar-icon"></BsFilterLeft>
    </button>
  );
};

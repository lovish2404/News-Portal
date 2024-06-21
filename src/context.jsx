import React from "react";
import { useContext, useState } from "react";

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterList, setFilters] = useState([]);
  const [saveList, setSaveList] = useState([]);
  const [paginationPayload, setPaginationPayload] = useState({
    total: 0,
    nextPageToken: "",
    prevPageToken: ["nan"],
    currentPage: 1,
  });
  const resetPayload = () => {
    setPaginationPayload({
      total: 0,
      nextPageToken: "",
      prevPageToken: ["nan"],
      currentPage: 1,
    });
  };
  return (
    <AppContext.Provider
      value={{
        searchKeyword,
        setSearchKeyword,
        sidebarOpen,
        setSidebarOpen,
        filterList,
        setFilters,
        saveList,
        setSaveList,
        paginationPayload,
        setPaginationPayload,
        resetPayload,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppProvider };

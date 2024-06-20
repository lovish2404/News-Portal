import React from "react";
import { useContext, useState } from "react";

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterList, setFilters] = useState([]);
  const [saveList, setSaveList] = useState([]);
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

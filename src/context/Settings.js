import React, { createContext, useContext, useState } from "react";

const SettingsContext = createContext();

const SettingsContextProvider = ({ children }) => {

  const [postsPerPage] = useState(3);
  
  const [currPage, setCurrPage] = useState(1);

  const [complete, setComplete] = useState(false);

  const todoContext = {
    currPage,
    setCurrPage,
    postsPerPage,
    complete,
    setComplete,
  };
  return (
    <SettingsContext.Provider value={todoContext}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettingsContext = () => useContext(SettingsContext);

export default SettingsContextProvider;
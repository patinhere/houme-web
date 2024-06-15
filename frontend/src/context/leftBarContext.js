import { createContext, useEffect, useState } from "react";

export const LeftBarContext = createContext();

export const LeftBarContextProvider = ({ children }) => {
  const [leftBarOpen, setLeftBarOpen] = useState(
    JSON.parse(localStorage.getItem("leftBar")) || false
  );

  const toggleL = () => {
    setLeftBarOpen(!leftBarOpen);
  };

  useEffect(() => {
    localStorage.setItem("leftBar", leftBarOpen);
  }, [leftBarOpen]);

  return (
    <LeftBarContext.Provider value={{ leftBarOpen, toggleL }}>
      {children}
    </LeftBarContext.Provider>
  );
};

import { createContext, useEffect, useState } from "react";

export const RightBarContext = createContext();

export const RightBarContextProvider = ({ children }) => {
  const [rightBarOpen, setRightBarOpen] = useState(
    JSON.parse(localStorage.getItem("rightBar")) || false
  );

  const toggleR = () => {
    setRightBarOpen(!rightBarOpen);
  };

  useEffect(() => {
    localStorage.setItem("rightBar", rightBarOpen);
  }, [rightBarOpen]);

  return (
    <RightBarContext.Provider value={{ rightBarOpen, toggleR }}>
      {children}
    </RightBarContext.Provider>
  );
};

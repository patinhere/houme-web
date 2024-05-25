import { createContext, useContext, useEffect, useState } from "react";

export const AvatarAnimationContext = createContext({});

export const AvatarAnimationProvider = (props) => {
  const [animationIndex, setAnimationIndex] = useState(1);

  useEffect(() => {
    setAnimationIndex(1);
  }, []);

  const resetIndex = () => {
    setAnimationIndex(0);
  };

  return (
    <AvatarAnimationContext.Provider
      value={{
        animationIndex,
        resetIndex,
      }}
    >
      {props.children}
    </AvatarAnimationContext.Provider>
  );
};

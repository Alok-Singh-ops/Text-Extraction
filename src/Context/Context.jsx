import React, { useReducer, useEffect, useContext } from "react";
import { createContext } from "react";
import { reducer } from "./reducer";

const TextContext = createContext();
const Context = ({ children }) => {
  const initState = {
    textData: [],
    cordinates: {
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
    },
    isCanvasDrawn: false,
    drawnCanvas: {
      customwidth: 0,
      customheight: 0,
    },
    isDrawnCanvasClicked: false,
  };

  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <TextContext.Provider value={{ state, dispatch }}>
      {children}
    </TextContext.Provider>
  );
};

export default Context;
export const TextState = () => {
  return useContext(TextContext);
};

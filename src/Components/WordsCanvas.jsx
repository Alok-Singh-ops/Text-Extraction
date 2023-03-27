import React, { useRef, useEffect, useContext, useState } from "react";
import { TextState } from "../Context/Context";

const WordsCanvas = ({ element }) => {
  const {
    state: { cordinates, isCanvasDrawn, drawnCanvas, isDrawnCanvasClicked },
    dispatch,
  } = TextState();
  // const {coOrdinatesData} = cordinates;
  const canvasRef = useRef(null);
  const { boundingBox } = element;
  // console.log(boundingBox);
  const heightRatio = 900 / 2200,
    widthRatio = 700 / 1700;
  const xCordinates = [],
    yCordinates = [];

  xCordinates.push(boundingBox[0]);
  yCordinates.push(boundingBox[1]);

  for (let index = 2; index < boundingBox.length; index++) {
    if (index % 2 === 0) {
      xCordinates.push(boundingBox[index]);
    } else {
      yCordinates.push(boundingBox[index]);
    }
  }
  // console.log(yCordinates);
  const orgWidth = Math.max(...xCordinates) - Math.min(...xCordinates);
  const orgHeight = Math.max(...yCordinates) - Math.min(...yCordinates);
  const width = orgWidth * widthRatio;
  const height = orgHeight * heightRatio;
  const x = xCordinates[0] * widthRatio;
  const y = yCordinates[0] * heightRatio;

  // console.log(state);
  const { startX, startY, endX, endY } = cordinates;
  const { customwidth, customheight } = drawnCanvas;

  // console.log(startX + " " + startY + " " + " " + customwidth + " " + customheight);
  // console.log("elements width and height" + " " + width + " " + height);

  // if ( isCanvasDrawn && (((x >  startX && y > startY) && (x < endX && y < endY) )&&  (customheight > height && customwidth > width)  )) {
  //   if (isDrawnCanvasClicked) {
  //     console.log();
  //   //   dispatch({
  //   //   type: "ADD_TO_KEYWORDS",
  //   //   payload: element.text
  //   // })
  //   }
  //   // console.log(element.text);
  // }

  // console.log(isCanvasDrawn);
  // console.log(customwidth + " " + width)
  // console.log(customheight + " " + height);
  // console.log(state);

  // if (isCanvasDrawn && customwidth > width && customheight > height) {
  //   console.log(element);
  // }
  // else{
  //   console.log("not");
  // }

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    // canvas.style.position = 'absolute';
    canvas.style.left = `${x}px`;
    canvas.style.top = `${y}px`;
    canvas.style.border = "1px solid red";

    //checking all the condition of the dragged canvas with the elements properties
    if (
      isCanvasDrawn &&
      x > startX &&
      y > startY &&
      x < endX &&
      y < endY &&
      customheight > height &&
      customwidth > width
    ) {
      if (isDrawnCanvasClicked) {
        console.log("clicked");
        dispatch({
          type: "ADD_TO_KEYWORDS",
          payload: element.text,
        });
      }
      // console.log(element.text);
    }
    // preventing the infinite loop
  }, [isDrawnCanvasClicked, isCanvasDrawn, x, customheight, customwidth]);

  return (
    <>
      <canvas
        ref={canvasRef}
        onClick={() => {
          dispatch({
            type: "ADD_TO_KEYWORDS",
            payload: element.text,
          });
        }}
      />
    </>
  );
};

export default WordsCanvas;

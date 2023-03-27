import React, { useRef, useEffect } from "react";
import { TextState } from "../Context/Context";
import WordsCanvas from "./WordsCanvas";

const Canvas = ({ element }) => {
  const {
    state: { cordinates, drawnCanvas, isCanvasDrawn, isDrawnCanvasClicked },
    dispatch,
  } = TextState();

  const canvasRef = useRef(null);
  const { boundingBox } = element;
  console.log("hi");

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

  const handleClick = () => {
    console.log(element.text);
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    // canvas.style.position = 'absolute';
    canvas.style.left = `${x}px`;
    canvas.style.top = `${y}px`;
    canvas.style.border = "1px solid red";
  }, []);

  // handling inner words

  const wordsData = element.words;
  const { startX, startY, endX, endY } = cordinates;
  const { customwidth, customheight } = drawnCanvas;

  // console.log(state);

  return (
    <>
      <canvas ref={canvasRef} onClick={handleClick} />
      {wordsData.map((element) => {
        //           const {boundingBox} = element
        //   // console.log(boundingBox);
        //   const heightRatio = 900/2200,widthRatio = 700/1700;
        //   const xCordinates = [],yCordinates = [];

        //   xCordinates.push(boundingBox[0]);
        //   yCordinates.push(boundingBox[1]);

        //   for (let index = 2; index < boundingBox.length; index++) {
        //     if (index % 2 === 0) {
        //       xCordinates.push(boundingBox[index]);
        //     }
        //     else{
        //       yCordinates.push(boundingBox[index])
        //     }
        //   }
        //   // console.log(yCordinates);
        //   const orgWidth = (Math.max(...xCordinates) - Math.min(...xCordinates) )
        //   const orgHeight = (Math.max(...yCordinates)- Math.min(...yCordinates))
        //   const width = orgWidth*widthRatio;
        //   const height = orgHeight*heightRatio
        //   const x= xCordinates[0]*widthRatio;
        //   const y = yCordinates[0]*heightRatio;

        // // console.log(state);
        //   const {startX,startY,endX,endY} = cordinates;
        //   const {customwidth,customheight} = drawnCanvas;

        //   // console.log(startX + " " + startY + " " + " " + customwidth + " " + customheight);
        //   // console.log("elements width and height" + " " + width + " " + height);
        //   if ( isCanvasDrawn && (((x >  startX && y > startY) && (x < endX && y < endY) )&&  (customheight > height && customwidth > width)  )) {
        //     if (isDrawnCanvasClicked) {
        //       dispatch({
        //       type: "ADD_TO_KEYWORDS",
        //        payload: element.text
        //      })
        //     }
        //   }
        return <WordsCanvas element={element} />;
      })}
    </>
  );
};

export default Canvas;

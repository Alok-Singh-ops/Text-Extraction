import React, { useRef, useState } from "react";
import { TextState } from "../Context/Context";

const CanvasDrag = () => {
  const {
    state: { isCanvasDrawn },
    dispatch,
  } = TextState();
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const ctxRef = useRef(null);
  const ctxoRef = useRef(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const prevStartXRef = useRef(0);
  const prevStartYRef = useRef(0);
  const prevWidthRef = useRef(0);
  const prevHeightRef = useRef(0);
  const [customwidth, setWidth] = useState();
  const [customheight, setHeight] = useState();
  const [startX, setStartX] = useState();
  const [startY, setStartY] = useState();
  const [endX, setEndX] = useState();
  const [endY, setEndY] = useState();

  const handleMouseDown = (e) => {
    e.preventDefault();
    // e.stopPropagation();
    dispatch({
      type: "CANVAS_CLICKED",
      payload: false,
    });

    const canvas = canvasRef.current;
    const overlay = overlayRef.current;
    const ctx = canvas.getContext("2d");
    const ctxo = overlay.getContext("2d");
    // console.log(ctx);
    // ctx.fillStyle = backgroundColor;
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    // save the starting x/y of the rectangle
    startXRef.current = parseInt(e.clientX - canvas.offsetLeft);
    startYRef.current = parseInt(e.clientY - canvas.offsetTop);

    //saving the starting co ordinates of the drawn canvas
    setStartX(startXRef.current);
    setStartY(startYRef.current);
    // set a flag indicating the drag has begun
    isDownRef.current = true;
    // save context references
    ctxRef.current = ctx;
    ctxoRef.current = ctxo;

    if (isCanvasDrawn) {
      dispatch({
        type: "CANVAS_CLICKED",
        payload: true,
      });
    }
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const ctxo = overlayRef.current.getContext("2d");
    // the drag is over, clear the dragging flag
    isDownRef.current = false;

    // draw the final rectangle on the overlay canvas
    ctxo.strokeRect(
      prevStartXRef.current,
      prevStartYRef.current,
      prevWidthRef.current,
      prevHeightRef.current
    );
    if (!isCanvasDrawn) {
      dispatch({
        type: "CANVAS_CLICKED",
        payload: false,
      });
    }
  };

  const handleMouseOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    isDownRef.current = false;
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const ctxo = overlayRef.current.getContext("2d");

    //     ctx.strokeStyle = "blue";
    // ctx.lineWidth = 3;
    // ctxo.strokeStyle = "blue";
    // ctxo.lineWidth = 3;

    // if we're not dragging, just return
    if (!isDownRef.current) {
      return;
    }

    // get the current mouse position
    const mouseX = parseInt(e.clientX - canvas.offsetLeft);
    const mouseY = parseInt(e.clientY - canvas.offsetTop);

    //saving the end points of the dragged canvas into the state

    setEndX(mouseX);
    setEndY(mouseY);

    // calculate the rectangle width/height based
    // on starting vs current mouse position
    const width = mouseX - startXRef.current;
    const height = mouseY - startYRef.current;

    // setdrawnCanvasWidth(width)
    // setdrawnCanvasHeight(height);

    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw a new rect from the start position
    // to the current mouse position
    ctx.strokeRect(startXRef.current, startYRef.current, width, height);
    prevStartXRef.current = startXRef.current;
    prevStartYRef.current = startYRef.current;
    prevWidthRef.current = width;
    prevHeightRef.current = height;

    // storing the height and width of the canvas

    setHeight(prevHeightRef.current);
    setWidth(prevWidthRef.current);

    //marking the canvas drawn so we can know it's drawn or not
    dispatch({
      type: "CANVAS_DRAWN",
    });

    // and at last saving all the co ordinates
    dispatch({
      type: "ADD_COORDINATES",
      payload: {
        startX,
        startY,
        endX,
        endY,
      },
    });

    // const selectedElements = getElementsInSelection(startX, startY, width, height);
    //   setSelectedElements(selectedElements);
  };

  // const getElementsInSelection = (startX, startY, width, height) => {
  //   console.log();

  //   return selectedElements;
  // };

  // const elementsInRange = getElementsInRange(startX, startY, endX, endY);
  // console.log(elementsInRange);

  // console.log(state);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={700}
        height={900}
        style={{ border: "1px solid red" }}
      ></canvas>
      <canvas
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseOut}
        onClick={() => {
          dispatch({
            type: "ADD_MEASUREMENT",
            payload: {
              customwidth,
              customheight,
            },
          });
          // dispatch({
          //   type: "CANVAS_CLICKED",
          //   payload: true
          // })
        }}
        ref={overlayRef}
        width={700}
        height={900}
        style={{ position: "absolute", left: 0, top: 0 }}
      ></canvas>
    </div>
  );
};

export default CanvasDrag;

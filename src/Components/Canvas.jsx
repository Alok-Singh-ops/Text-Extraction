import React, { useRef, useEffect } from 'react';

const Canvas = ({element}) => {
  const canvasRef = useRef(null);
  console.log(element.words);
  const {boundingBox} = element
  // console.log(boundingBox);

  const heightRatio = 900/2200,widthRatio = 700/1700;
  const xCordinates = [],yCordinates = [];

  xCordinates.push(boundingBox[0]);
  yCordinates.push(boundingBox[1]);

  for (let index = 2; index < boundingBox.length; index++) {
    if (index % 2 === 0) {
      xCordinates.push(boundingBox[index]);
    }
    else{
      yCordinates.push(boundingBox[index])
    }
  }
  // console.log(yCordinates);
  const orgWidth = (Math.max(...xCordinates) - Math.min(...xCordinates) )
  const orgHeight = (Math.max(...yCordinates)- Math.min(...yCordinates))
  const width = orgWidth*widthRatio;
  const height = orgHeight*heightRatio
  const x= xCordinates[0]*widthRatio;
  const y = yCordinates[0]*heightRatio;

  const handleClick = ()=>{
    console.log(element.text);
    
    // console.log(x + " " + y);

    
  }


  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    // canvas.style.position = 'absolute';
    canvas.style.left = `${x}px`;
    canvas.style.top = `${y}px`;
    canvas.style.border = '1px solid red';
  }, []);

  return <canvas ref={canvasRef} onClick= {handleClick} />;
};

export default Canvas;

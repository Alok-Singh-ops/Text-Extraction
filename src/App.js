import './App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
import ImageExtract from './Components/ImageExtract';
import Canvas from './Components/Canvas'


function App() {
  // const [data,setData] = useState([]);
  // const [x, setX] = useState(0);
  // const [y, setY] = useState(0);

  // useEffect(() => {
  //   const element = document.querySelector("img");
  //   const rect = element.getBoundingClientRect();
  //   setX(rect.left);
  //   setY(rect.top);
  //   const getData = async ()=>{
  //     const res = await axios("data.json");
  //     setData(res.data.analyzeResult.readResults[0].lines);
  //   }
  //   getData();
  // }, [])
  return (
    <div className="App">
      <ImageExtract/>
      
    </div>
  );
}

export default App;

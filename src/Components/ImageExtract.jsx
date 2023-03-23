import React, { useEffect,useRef,useState } from 'react'
import image from "../assests/MicrosoftTeams-image.png"
import Keywords from './Keywords'
import "./imageSection.css"
import axios from 'axios'
import Canvas from './Canvas'


const ImageExtract = () => {
  const [data,setData] = useState([]);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [selectedItemWidth,setSelectedItemWidth] = useState({});
  const [selectedItemHeight,setSelectedItemHeight] = useState({});




  useEffect(() => {
    const element = document.querySelector("img");
    const rect = element.getBoundingClientRect();
    setX(rect.left);
    setY(rect.top);
    const getData = async ()=>{
      const res = await axios("data.json");
      setData(res.data.analyzeResult.readResults[0].lines);
    }
    getData();
  }, [])
  
  return (
    <div className='image-section'>
      <img src={image} alt="" height={900} width = {700} id = "example" className='img1'/>
      {
        data.map((element,index) =>{
          return <Canvas key={index} element = {element} selectedItemWidth = {setSelectedItemWidth} selectedItemHeight = {setSelectedItemHeight}/>
        })
      }
      
    </div>
  )
}

export default ImageExtract
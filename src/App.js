import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ImageExtract from "./Components/ImageExtract";
import Canvas from "./Components/Canvas";
import Keywords from "./Components/Keywords";
import CanvasDrag from "./Components/CanvasDrag";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="left">
          <ImageExtract />
        </div>
        <div className="right">
          <Keywords />
        </div>
      </div>
    </div>
  );
}

export default App;

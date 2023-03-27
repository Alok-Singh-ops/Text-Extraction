export const reducer = (state,action)=>{
  switch (action.type) {
    case "ADD_TO_KEYWORDS":
    const data = action.payload;
      return ({...state,
        textData: [...state.textData,data]
      })

      case "ADD_COORDINATES":
        const cordinates = action.payload
        return ({
          ...state,
          cordinates
        })

        case "ADD_MEASUREMENT":
        const measurement = action.payload
        return ({
          ...state,
          drawnCanvas: measurement
          
        })
        

        case "CANVAS_DRAWN":
          return({
            ...state,
            isCanvasDrawn: true
          })

          case "CANVAS_CLICKED":
            return ({
              ...state,
              isDrawnCanvasClicked: action.payload

            })

    default:
      break;
  }
}
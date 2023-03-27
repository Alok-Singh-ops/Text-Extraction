import React from 'react'
import { TextState } from '../Context/Context'

const Keywords = () => {
  const {state: {textData}} = TextState();

  return (
    <div>
      Keywords
      <ul>
        {
          textData.map((keyword,index) =>{
            return <li >
              {keyword}
            </li>
          })
        }
      </ul>
      
      
    </div>
    
  )
}

export default Keywords
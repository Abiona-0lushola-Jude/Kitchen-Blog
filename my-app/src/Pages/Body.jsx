import React from 'react'
import Data from './Data'
import Alldata from './rawdata'

export default function Body() {
  return (
    <div className='body'>
      {Alldata.map((el,i)=>{
        return(
            <Data key={i} data={el} />
        )
      })}
    </div>
  )
}

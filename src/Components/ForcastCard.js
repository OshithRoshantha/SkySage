import React from 'react'
import './ForcastCard.css'

export default function ForcastCard({value,heading,unit,icon}) {
  return (
    <div className='card-conatiner'>
        <p className='preview-time pt-3'>{heading}</p>
        <p className='preview-rain fs-2'>{value}</p>
        <p className='preview-time fs-6'>{unit}</p>
        <div className={`more-icons mt-2 ${icon}`}></div>
    </div>
  )
}

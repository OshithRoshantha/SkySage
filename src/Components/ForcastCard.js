import React from 'react'
import './ForcastCard.css'

export default function ForcastCard() {
  return (
    <div className='card-conatiner'>
        <p className='preview-time pt-3'>2 AM</p>
        <div className="weather-preview2"></div>
        <p className='preview-rain'>20%</p>
        <p className='preview-temp h1'>23&deg;</p>
    </div>
  )
}

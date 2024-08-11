import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './Main.css'
import ForcastCard from './ForcastCard';

export default function Main() {
  return (
    <div className='app'>
        <div className="app-container">
            <h1 className='main-location-name text-light display-6'>University of Kelaniya</h1>
            <p className='main-temp text-light h1'>35&deg;</p>
            <p className='main-weather-description'>Broken Clouds</p>
            <div className="min-info">
              <div className="min-info-icon">
                <img className='min-info-icons' src="./Assets/Images/wind-speed.png"/>
                <p className='min-info-icon-name'>Wind</p>
                <p className='min-info-icon-name'>speed</p>
              </div>
              <p className='min-info-value text-light ms-1'>20m/s</p>
              <div className="min-info-icon ms-5">
                <img className='min-info-icons2' src="./Assets/Images/rain.png"/>
                <p className='min-info-icon-name'>Rain</p>
              </div>
              <p className='min-info-value text-light'>20%</p>
            </div>
            <div className="weather-preview">

            </div>
            <div className="forcast-conatiner">
              <div className="preview-header">
                <p className='forcast-type text-light'>Hourly Forcast</p>
                <hr className='divider text-light'></hr>
              </div>
              <Swiper
                slidesPerView={8}
                spaceBetween={18}
                slidesPerGroup={1}
              >
              <SwiperSlide>
                  <ForcastCard/>    
              </SwiperSlide>
              </Swiper>
            </div>

        </div>
        <div className="footer">
          <p className='author'>Project by Oshith Roshantha 😇</p>
        </div>
    </div>
  )
}

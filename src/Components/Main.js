import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './Main.css'
import ForcastCard from './ForcastCard';

export default function Main() {
  const [overlayStyle, setOverlayStyle]=useState({});
  const[locationMinimalise,setLocationMinimalise]=useState({});
  const[openOverlayBtn,setOpenOverlayBtn]=useState(true);
  const[closeOverlayBtn,setCloseOverlayBtn]=useState(false);
  const[locationMinimaliseHeading,setLocationMinimaliseHeading]=useState({display:'none'});

  const openOverlay = () => {
    setOverlayStyle({
      height: '85vh',
      backgroundColor: '#272c4f'
    });
    setLocationMinimalise({
      display:'none'
    });
    setLocationMinimaliseHeading({
      display:'block'
    });
    setOpenOverlayBtn(false);
    setCloseOverlayBtn(true);
  };

  const closeOverlay=()=>{
    setOverlayStyle({});
    setLocationMinimalise({});
    setLocationMinimaliseHeading({
      display:'none'
    });
    setCloseOverlayBtn(false);
    setOpenOverlayBtn(true);
  }

  return (
    <div className='app'>
        <div className="app-container">
            <h1 className='main-location-name text-light display-6' style={locationMinimalise}>University of Kelaniya</h1>
            <p className='main-temp text-light h1' style={locationMinimalise}>35&deg;</p>
            <p className='main-weather-description' style={locationMinimalise}>Broken Clouds</p>
            <div className="minimalise-heading" style={locationMinimaliseHeading}>
              <p className='minimalise-location-name text-light'>University of Kelaniya</p>
              <div className="minimalise-description">
                <swap className='temp'>35&deg;</swap> | <swap className='weather'>Broken Clouds</swap>
              </div>
            </div>

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
            <div className="forcast-conatiner" style={overlayStyle}>
              {openOverlayBtn &&
              <div className="div-open"  onClick={openOverlay}>
                <div className="open-btn"></div>
              </div>}
              {closeOverlayBtn &&
              <div className="div-open"  onClick={closeOverlay}>
                <div className="open-btn"></div>
              </div>}
              <div className="preview-header">
                <p className='forcast-type text-light'>Hourly Forcast</p>
                <hr className='divider text-light'></hr>
              </div>
              <Swiper className='ms-3'
                slidesPerView={4}
                spaceBetween={18}
                slidesPerGroup={1}
              >
              <SwiperSlide>
                  <ForcastCard/>     
              </SwiperSlide>
              <SwiperSlide>
                  <ForcastCard/>     
              </SwiperSlide>
              <SwiperSlide>
                  <ForcastCard/>     
              </SwiperSlide>
              <SwiperSlide>
                  <ForcastCard/>     
              </SwiperSlide>
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

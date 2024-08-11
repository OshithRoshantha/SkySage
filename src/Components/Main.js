import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './Main.css'
import ProgressBar from 'react-bootstrap/ProgressBar';
import ForcastCard from './ForcastCard';

export default function Main() {

  const [uvIndex, setUvIndex] = useState(1.2);
  const [fillColor, setFillColor] = useState('');
  const[uvStatus,setUvStatus]=useState('');

  useEffect(() => {
    if (uvIndex <= 2) {
      setFillColor('#00FF00'); 
      setUvStatus('LOW');
    } else if (uvIndex <= 5) {
      setUvStatus('MODERATE');
      setFillColor('#FFFF00'); 
    } else if (uvIndex <= 7) {
      setUvStatus('HIGH');
      setFillColor('#FFA500');
    } else {
      setUvStatus('VERY HIGH');
      setFillColor('#FF4500'); 
    }
  }, [uvIndex]);

  const [overlayStyle, setOverlayStyle]=useState({});
  const[locationMinimalise,setLocationMinimalise]=useState({});
  const[openOverlayBtn,setOpenOverlayBtn]=useState(true);
  const[closeOverlayBtn,setCloseOverlayBtn]=useState(false);
  const[locationMinimaliseHeading,setLocationMinimaliseHeading]=useState({display:'none'});

  const openOverlay = () => {
    setOverlayStyle({
      height: '80vh',
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
                <img className='min-info-icons' src="./Assets/Images/humidity.png"/>
                <p className='min-info-icon-name'>Humidity</p>
              </div>
              <p className='min-info-value text-light ms-1'>59%</p>
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
                <p className='forcast-type text-light'>Hourly Forecast</p>
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
              <div className="more-info">
                <div className="uv-index">
                  <div className="info-bar">
                    <img className='info-icons' src="./Assets/Images/uv-index.png"/>
                  </div>
                  <p className='text-light hb1'>{uvIndex}</p>
                  <p className='text-light hb2'>{uvStatus}</p>
                  <ProgressBar className='uv-scale' variant='light' now={100-(uvIndex*10)} style={{marginLeft:'6%',marginTop:'1%', height: '1px', width:'85%', backgroundColor:`${fillColor}`}}/>
                </div>
                <div className="info-row">
                  <div className="sun-rise">
                    <div className="info-bar">
                    <img className='info-icons' src="./Assets/Images/sun-rise.png"/>
                    </div>
                    <p className='text-light hb3'>5.34 AM</p>
                    <p className='text-light hb6'>Sunset: 6.50 PM</p>
                  </div>
                  <div className="wind">
                    <div className="info-bar">
                    <img className='info-icons' src="./Assets/Images/wind.png"/>
                    </div>
                    <p className='text-light hb4'>9.7</p>
                    <p className='text-light hb5'>Km/h</p>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div className="footer">
          <p className='author'>Project by Oshith Roshantha 😇</p>
        </div>
    </div>
  )
}

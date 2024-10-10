import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Form, ProgressBar } from 'react-bootstrap';
import 'swiper/css';
import './Main.css';
import ForcastCard from './ForcastCard';

export default function Main() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [fillColor, setFillColor] = useState('');
  const [uvStatus, setuvStatus] = useState('');
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [showSetLocation, setShowSetLocation] = useState(true);
  const [overlayStyle, setOverlayStyle] = useState({});
  const [locationMinimalise, setLocationMinimalise] = useState({});
  const [openOverlayBtn, setOpenOverlayBtn] = useState(true);
  const [closeOverlayBtn, setCloseOverlayBtn] = useState(false);
  const [locationMinimaliseHeading, setLocationMinimaliseHeading] = useState({ display: 'none' });

  const [locationName, setLocationName] = useState();
  const [uv, setUv] = useState();
  const [temp, setTemp] = useState(35);
  const [description, setDescription] = useState();
  const [humidity, setHumidity] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [wind, setWind] = useState(0);
  const [dew, setDew] = useState(0);
  const [precip, setPrecip] = useState(0);
  const [cloud, setCloud] = useState(0);
  const [visible, setVisible] = useState(0);


useEffect(() => {
  if (navigator.geolocation) {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting location:", error.message);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }
}, []);

  async function getWetherData(){
    console.log(location.latitude, location.longitude);
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${location.latitude},${location.longitude}`);
    const data = await response.json();
    setLocationName(data["location"]["name"]);
    setTemp(data["current"]["temp_c"]);
    setDescription(data["current"]["condition"]["text"]);
    setHumidity(data["current"]["humidity"]);
    setWind(data["current"]["wind_kph"]);
    setUv(data["current"]["uv"]);
    setPressure(data["current"]["pressure_mb"]);
    setDew(data["current"]["dewpoint_c"]);
    setPrecip(data["current"]["precip_mm"]);
    setCloud(data["current"]["cloud"]);
    setVisible(data["current"]["vis_km"]);
  }

  function converTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000); 
    const options = {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC' 
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

  useEffect(() => {
    let fillColor = '';
    let uvStatus = '';
    if (uv <= 3) {
      fillColor = '#008000';
      uvStatus = 'LOW';
    } else if (uv <= 6) {
      fillColor = '#FFFF00';
      uvStatus = 'MODERATE';
    } else if (uv <= 9) {
      fillColor = '#FFA500';
      uvStatus = 'HIGH';
    } else if (uv <= 10) {
      fillColor = '#FF0000';
      uvStatus = 'VERY HIGH';
    } else {
      fillColor = '#800080';
      uvStatus = 'EXTREME';
    }
    setFillColor(fillColor);
    setuvStatus(uvStatus);
  }, [uv]);

  const searchLocation = () => {
    setShowSearchBox(false);
    setShowSetLocation(true);
  };

  const toggleSearchBox = () => {
    setShowSearchBox(!showSearchBox);
    setShowSetLocation(false);
  };

  const openOverlay = () => {
    setOverlayStyle({
      height: '80vh',
      backgroundColor: '#272c4f',
    });
    setLocationMinimalise({
      display: 'none',
    });
    setLocationMinimaliseHeading({
      display: 'block',
    });
    setOpenOverlayBtn(false);
    setCloseOverlayBtn(true);
    setShowSearchBox(false);
  };

  const closeOverlay = () => {
    setOverlayStyle({});
    setLocationMinimalise({});
    setLocationMinimaliseHeading({
      display: 'none',
    });
    setCloseOverlayBtn(false);
    setOpenOverlayBtn(true);
    setShowSetLocation(true);
  };

  getWetherData();

  return (
    <div className="app">
      <div className="app-container">
        <h1 className="main-location-name text-light display-6" style={locationMinimalise}>
        {locationName}
        </h1>
        <p className="main-temp text-light h1" style={locationMinimalise}>
          {temp}&deg;c
        </p>
        <p className="main-weather-description" style={locationMinimalise}>
          {description}
        </p>
        <div className="minimalise-heading" style={locationMinimaliseHeading}>
          <p className="minimalise-location-name text-light">{locationName}</p>
          <div className="minimalise-description">
            <swap className="temp">{temp}&deg;c</swap> | <swap className="weather">{description}</swap>
          </div>
        </div>

        <div className="min-info">
          {showSearchBox && (
            <div className="searchBox">
              <Form.Control className="searchBoxInput" type="text" placeholder="Search by city" />
              <div className="search-btn" onClick={searchLocation}>
                <img className="target" src="./Assets/Images/target.png" />
                &nbsp;&nbsp;Set location
              </div>
            </div>
          )}
          {showSetLocation && (
            <div className="getLocation" onClick={toggleSearchBox}>
              <img className="arrow" src="./Assets/Images/search.png" />
            </div>
          )}
        </div>
        <div className="weather-preview"></div>
        <div className="forcast-conatiner" style={overlayStyle}>
          {openOverlayBtn && (
            <div className="div-open" onClick={openOverlay}>
              <div className="open-btn"></div>
            </div>
          )}
          {closeOverlayBtn && (
            <div className="div-open" onClick={closeOverlay}>
              <div className="open-btn"></div>
            </div>
          )}
          <div className="preview-header">
            <p className="forcast-type text-light">Additional Weather Insights</p>
            <hr className="divider text-light"></hr>
          </div>
          <Swiper className="ms-3" slidesPerView={4} spaceBetween={18} slidesPerGroup={1}>
            <SwiperSlide>
              <ForcastCard heading={'Dew'} value={dew} unit={'°c'} icon={'dew'}/>
            </SwiperSlide>
            <SwiperSlide>
              <ForcastCard heading={'Precip'} value={precip} unit={'mm'} icon={'rain'}/>
            </SwiperSlide>
            <SwiperSlide>
              <ForcastCard heading={'Cloud'} value={cloud} unit={'%'} icon={'cloud'}/>
            </SwiperSlide>
            <SwiperSlide>
              <ForcastCard heading={'Visibile'} value={visible} unit={'km'} icon={'visible'}/>
            </SwiperSlide>
            <SwiperSlide>
              <ForcastCard heading={'Pressure'} value={pressure} unit={'mb'} icon={'pressure'}/>
            </SwiperSlide>
          </Swiper>
          <div className="more-info">
            <div className="uv-index">
              <div className="info-bar">
                <img className="info-icons" src="./Assets/Images/uv-index.png" />
              </div>
              <p className="text-light hb1">{uv}</p>
              <p className="text-light hb2">{uvStatus}</p>
              <ProgressBar
                className="uv-scale"
                variant="light"
                now={100-uv*10}
                style={{ marginLeft: '6%', marginTop: '1%', height: '1px', width: '85%', backgroundColor: `${fillColor}` }}
              />
            </div>
            <div className="info-row">
              <div className="sun-rise">
                <div className="info-bar">
                  <img className="info-icons" src="./Assets/Images/humidity-val.png" />
                </div>
                <p className="text-light hb4">{humidity}<span className='fs-6'>%</span></p>
              </div>
              <div className="wind">
                <div className="info-bar">
                  <img className="info-icons" src="./Assets/Images/wind.png" />
                </div>
                <p className="text-light hb4">{wind}<span className='fs-6'>Kmph</span></p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <p className="author">Project by Oshith Roshantha 😇</p>
      </div>
    </div>
  );
}
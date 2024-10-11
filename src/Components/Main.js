import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Form, ProgressBar } from 'react-bootstrap';
import 'swiper/css';
import './Main.css';
import ForcastCard from './ForcastCard';

export default function Main() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [manualLocation, setManualLocation] = useState('');
  const [useGeolocation, setUseGeolocation] = useState(true);
  const [fillColor, setFillColor] = useState('');
  const [uvStatus, setuvStatus] = useState('');
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [showSetLocation, setShowSetLocation] = useState(true); 
  const [showCurrentLocation, setShowCurrentLocation] = useState(false);
  const [overlayStyle, setOverlayStyle] = useState({});
  const [locationMinimalise, setLocationMinimalise] = useState({});
  const [openOverlayBtn, setOpenOverlayBtn] = useState(true);
  const [closeOverlayBtn, setCloseOverlayBtn] = useState(false);
  const [locationMinimaliseHeading, setLocationMinimaliseHeading] = useState({ display: 'none' });

  const [locationName, setLocationName] = useState();
  const [icon, setIcon] = useState();
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

  async function getWeatherData() {
    if (location) {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${location.latitude},${location.longitude}`);
      const data = await response.json();
      updateWeatherData(data);
    }
  }

  async function getWeatherDataManual() {
    if (manualLocation) {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${manualLocation}`);
      const data = await response.json();
      if(!data.error) {
        updateWeatherData(data);
      }
    }
  }

  function updateWeatherData(data) {
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
    setIcon(data["current"]["condition"]["icon"]);
  }

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); 
  }, []);

  useEffect(() => {
    let watchId;
  
    if (useGeolocation && navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert("Location access is denied. Please enable location services.");
              break;
            case error.POSITION_UNAVAILABLE:
              alert("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              alert("The request to get location timed out. Please try again.");
              break;
            default:
              alert("An unknown error occurred while fetching location.");
              break;
          }
          console.error("Error fetching location:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    }
  
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [useGeolocation]);
  
  useEffect(() => {
    if (useGeolocation) {
      getWeatherData();
    } else {
      getWeatherDataManual();
    }
  }, [location, manualLocation, useGeolocation]);
  
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
    setShowSetLocation(false);
    setManualLocation(document.querySelector('.searchBoxInput').value);
    setUseGeolocation(false);
    setShowCurrentLocation(true);
  };

  const toggleSearchBox = () => {
    setShowSearchBox(!showSearchBox);
    setShowSetLocation(false);
  };

  const toCurrentSearch = () => {
    setShowCurrentLocation(false);
    setManualLocation('');
    setUseGeolocation(true);
    setShowSetLocation(true);
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
  };

  return (
    <div className="app">
      {isDesktop && (<div className='desktop'>
        <img className='main-logo' src="./Assets/Logos/logo-Main.png"/>
        <div className='innerDesktop'>
          <img className="nD"src="./Assets/Images/noDesktop.png" />
          <div className='innerDesktop2'>
          <p className='fs-7 ' align='left'>Designed for mobile devices and is not available on desktop.</p>
          <p className='fs-7 ' align='left'>Please access <b>SkySage</b> on your smartphone or tablet.</p></div>
        </div>
      </div>)}
      {!isDesktop && (
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
              <Form.Control className="searchBoxInput" type="text" placeholder="Search by city"/>
              <div className="search-btn" onClick={searchLocation}>
                <img className="target" src="./Assets/Images/target.png" />
                &nbsp;&nbsp;Set location
              </div>
            </div>
          )}
          <div className='button-tray'>
          {showSetLocation && (
            <div className="getLocation" onClick={toggleSearchBox}>
              <img className="arrow" src="./Assets/Images/search.png" />
            </div>
          )}
          {showCurrentLocation && (
            <div className="currentLocation" onClick={toCurrentSearch}>
              <img className="arrow" src="./Assets/Images/arrow.png" />
            </div>
          )}
          </div>
        </div>
        <img className="weather-preview" src={icon}></img>
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
          <Swiper className="ms-3" slidesPerView={4} spaceBetween={18} slidesPerGroup={1} >
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
              <ForcastCard heading={'Visible'} value={visible} unit={'km'} icon={'visible'}/>
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
      </div>)}
    </div>
  );
}
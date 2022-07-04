import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [ climate, setClimate ] = useState( {} )
  const [ temperature, setTemperature ] = useState(0)
  const [isCelsius, setIsCelsius ] = useState(true)


  useEffect(() => {

    const success = pos => {
      const lat = pos.coords.latitude;
      
      const lon = pos.coords.longitude;

      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6f9cb977f2d4a2403ec6e9395df42851`)
      .then( res => {
        setClimate(res.data)
        setTemperature(Math.round(res.data.main?.temp - 273.15))
    });
  
  }

    navigator.geolocation.getCurrentPosition(success)

  }, [])

  const convertTemperature = ()=>{
   if(isCelsius){
    setTemperature(Math.round(temperature * 9 / 5 + 32))
    setIsCelsius(false)
  }else{
   setTemperature(Math.round((temperature - 32) / 1.8 ))
   setIsCelsius(true)
  }
}
  
  console.log(climate)
  console.log(temperature)

  return (
    <div className="Weather-app">
      <div className='weather-box'>
        <h1>Weather App</h1>
        <h3>{climate?.name}, {climate?.sys?.country}</h3>
        <img src={`http://openweathermap.org/img/wn/${climate.weather?.[0].icon}@2x.png`} alt="" />
        <div className="temperature">{temperature} {isCelsius ? "°C":"°F"}</div>
        <button onClick={convertTemperature}>Degrees °F/°C</button>
      </div>
    </div>
  )

}

export default App

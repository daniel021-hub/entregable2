import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Loader from './components/Loader'
import WeatherCard from './components/WeatherCard'

function App() {
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()
  const [isCelsius, setIsCelsius] = useState(true);

  //Aqui obtenemos las coordenadas de la API del navegador y las montamos en un estado

  function success(pos) {
    const newCoords = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }
    setCoords(newCoords)
  }

  const changeUnitTemp = () => setIsCelsius(!isCelsius)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  //------------Peticion de los datos del clima-------------

  useEffect(() => {
    if(coords){
      const API_KEY = "26a7faf3de8968d4c97a75de7f49c8d0"
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
      axios.get(URL)
        .then(res => {
          setTimeout(() => {
            setWeather(res.data)
            const celsius = (res.data.main.temp - 273.15).toFixed(2);
            const fahrenheit = (celsius * (9/5) + 32).toFixed(2);
            const newTemperature = { celsius, fahrenheit }
            setTemperature(newTemperature)
          }, 1000)
        })
        .catch(err => console.log(err))
    } 
  }, [coords])
  
  return (
    <div className='App'>
      {
        weather ? (
          <WeatherCard 
          weather={weather} 
          temperature={temperature} 
          isCelsius={isCelsius} 
          changeUnitTemp={changeUnitTemp}
        />
        ) : <Loader />
      }
    </div> 
  )
}

export default App

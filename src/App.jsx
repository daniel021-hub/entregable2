import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard'

function App() {
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()

  //Aqui obtenemos las coordenadas de la API del navegador y las montamos en un estado

  const success = (pos) => {
    const newCoords = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }
    setCoords(newCoords)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  //------------Peticion de los datos del clima-------------

  useEffect(() => {
    if(coords){
      const API_KEY = "26a7faf3de8968d4c97a75de7f49c8d0"
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
      axios.get(URL)
        .then(res => setWeather(res.data))
        .catch(err => console.log(err))
    } 
  }, [coords])
  
  return (
    <div className='App'>
      {
        weather ? <WeatherCard weather={weather} /> :
        <p>Loading...</p>
      }
    </div> 
  )
}

export default App

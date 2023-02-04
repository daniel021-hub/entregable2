import React from 'react'
import "./styles/WeatherCard.css"

const WeatherCard = ({weather, temperature, isCelsius, changeUnitTemp}) => {
    return (
        <section className="weatherCard">
            <h1 className="weatherCard_title">Weather App</h1>
            <h2 className="weatherCard_place">{weather?.name}, {weather?.sys.country}</h2>
            <div className="weatherCard_img">
                <img src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="icon weather" />
                </div>
                <h3 className="weatherCard_temp">{isCelsius ? temperature?.celsius + " °C" : temperature?.fahrenheit + " °K"}</h3>
                <ul className="weatherCard_list">
                    <li className="weatherCard_description">{weather?.weather[0].main}, {weather?.weather[0].description}</li>
                    <li><span>Wind speed:</span> {weather?.wind.speed} m/s</li>
                    <li><span>Clouds:</span> {weather?.clouds.all} %</li>
                    <li><span>Pressure:</span> {weather?.main.pressure} hPa</li>
                </ul>
                <button className="weatherCard_btn" onClick={changeUnitTemp}>&deg;C / &deg;F</button>
        </section>
    )
}

export default WeatherCard
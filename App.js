import React, {useState} from "react";
import axios from "axios";
import "./App.css";

function App () {
  const [city, setCity] = useState(" ");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] =useState(null);

  //const API_KEY = "98427de6d67e6c609b4cb7af7a11932b";
  const API_KEY = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={"98427de6d67e6c609b4cb7af7a11932b"}`;
  const fetchWeatherData =async () => {
    try{
      const response = await axios.get (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        setWeatherData (response.data);
        setError (null);
    }
    catch(err) {
      setWeatherData(null);
      setError("OOPS!!! City Not Found");
    }
  };
  const handleConvertToFahrenheit = (celcius) => {
    return (celcius * 9) /5 +32;
  };
  const handleInputChange =(e) => {
    setCity(e.target.value);
  };
  const handleSubmit =(e) => {
    e.preventDefault ();
    fetchWeatherData ();
  };
  
  return (
    <div className="App">
      <h1> Weather Prediction App </h1>
      <form onSubmit={handleSubmit}>
        <label>Provide the City Name: <input type="text" value={city} onChange={handleInputChange} />
        </label>
        <button type="submit">Fetch Weather</button>
      </form>
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <h2> {weatherData.name}, {weatherData.sys.country}</h2>
          <p>Current Temperature: {weatherData.main.temp} °C ({handleConvertToFahrenheit(weatherData.main.temp)} °F)</p>
          <p>Minimum Temperature: {weatherData.main.temp_min} °C</p>
          <p>Maximum Temperature: {weatherData.main.temp_max} °C</p>
          <p>Humidity: {weatherData.main.humidity} %</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>Wind Direction: {weatherData.wind.deg} °</p>
          <p>Description: {weatherData.weather[0].description}</p>
         </div>
      )
      }
      </div>
      );
    }
     export default App;
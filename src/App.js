import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from "react";
import './App.css';

function App() {

  const [weatherData, setWeatherData] = useState({});
  const [country, setCountry] = useState();
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState();

  const apiKey = "f56f24967aaf51182d1d4df628297c6d"
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      .then((response) => {
        setWeatherData(response.data);
      });
  };

  function handleCountry(event) {
    setCountry(event.target.value)
    setCities(countries.find(ctr => ctr.name === event.target.value).states);
  }
  const handleLocationChange = (e) => {
    setCity(e.target.value)
  };

  const countries = [
    {
      name: "Pakistan",
      states: [
        {
          name: "Islamabad"
        },
        {
          name: "Lahore"
        },
        {
          name: "Karachi"
        },
      ],
    },
    {
      name: "India",
      states: [
        {
          name: "Delhi"
        },
        {
          name: "Mumbai"
        },
        {
          name: "Pune"
        },
      ],
    },
  ];


console.log(city);

  return (
    <div className="col-md-12">
            <form onSubmit={handleSubmit} className="col-md-12 text-center mt-5">
              <div className="slct">
      <select  onChange={handleCountry} className="form-select w-25" >
        <option>Select Countries</option>
        {countries.map((ctr) => (
          <option value={ctr.name}>{ctr.name}</option>
        ))}
      </select>
        <select  onChange={handleLocationChange} className="form-select w-25 slct1">
        <option>Select City</option>
        {cities.map((c) => (
          <option value={city}>{c.name}</option>
        ))}
      </select>
      </div>
      <br />
        <button type="submit" className="btn btn-outline-dark">Check Weather</button>
      </form>

      {Object.keys(weatherData).length > 0 &&
        <div className="col-md-12 text-center mt-5">

          <div className="shadow rounded wetherResultBox">
            <img className="weathorIcon"
              src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" />

            <h5 className="weathorCity">
              {weatherData?.name}
            </h5>
            <h6 className="weathorTemp">{weatherData.main ? <p className='bold'>{(weatherData.main.feels_like - 273).toFixed()}°C</p> : null}</h6>
          </div>
        </div>
      }

    </div>
  );
}
export default App;




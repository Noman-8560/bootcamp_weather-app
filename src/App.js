import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

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

  const [country, setCountry] = useState();
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState();
  function handleCity(event) {
    setCity(event.target.value)
  }
  function handleCountry(event) {
    setCountry(event.target.value)
    setCities(countries.find(ctr => ctr.name === event.target.value).states);
  }


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=5656aa77b42bc6ebdc09fc4d9a4a7955`


  const searchLocation = (event) => {
    if (event.key === " " || event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
        console.log(response.data.cod)
      })
      setLocation('')
    }
  }

  return (
    <div className="app">
      <div className="search">
         <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div  className='slt'>
      <select onChange={handleCountry}>
        <option>Select Countries</option>
        {countries.map((ctr) => (
          <option value={ctr.name}>{ctr.name}</option>
        ))}
      </select>
      <select onChange={handleCity}>
        <option>Select City</option>
        {cities.map((c) => (
          <option value={location} onChange={event => setLocation(event.target.value)} onKeyPress={searchLocation} type="submit">{c.name}</option>
        ))}
      </select>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }

      </div>
    </div>
  );
}

export default App;

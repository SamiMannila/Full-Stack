import React,{useState, useEffect} from 'react';
import axios from 'axios'
import testUtils from 'react-dom/test-utils';

const Country = ({country }) => {
  const [showData,setShowData]=useState(false);

  const handleClick = () =>{
    setShowData(!showData)
  }

  if(showData){
    return (
      <div>
        <div>
          {country.name} <button onClick={handleClick}>hide</button>
        </div>
        
        <div>
          <h2>{country.name}</h2>
          <p>capital: {country.capital}</p>
          <p>population: {country.population}</p>
          <h3>languages</h3>
          <ul>
            {country.languages.map(language =>
              <li key={language.name}>{language.name}</li>
            )}
          </ul>
          <img className="flag" src={country.flag} alt="Country flag"></img>
        </div>
      </div>
    )
  }else{
    return (
      <div>
        {country.name} <button onClick={handleClick}>show</button>
      </div>
    )
  }
}

const CountryFull = ({country}) =>{
  const [weatherData, setWeatherData] = useState([])

  const params = {
    access_key: process.env.REACT_APP_API_KEY,
    query: country.capital
  }

  const weatherHook = () => {
    console.log('weather effect')
    axios
      .get('http://api.weatherstack.com/current', {params})
      .then(response => {
        console.log('weather promise fulfilled')
        setWeatherData(response.data)
      })
  }
  useEffect(weatherHook, [])

  
  if(weatherData.current != undefined){
    console.log(weatherData.current);
    return(
      <div>
        <h2>{country.name}</h2>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <h3>Spoken languages</h3>
        <ul>
          {country.languages.map(language =>
            <li key={language.name}>{language.name}</li>
          )}
        </ul>
        <img className="flag" src={country.flag} alt="Country flag"></img>
  
        <h3>Weather in {country.capital}</h3>
        <p>temperature: {weatherData.current.temperature}</p>
        <img className = "flag" src={weatherData.current.weather_icons[0]} alt = "Weatehr Icon"></img>
        <p>wind: {weatherData.current.wind_speed} mph direction {weatherData.current.wind_dir}</p>
      </div>
    ) 
  }else{
    return(
      <div>
        <h2>{country.name}</h2>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <h3>Spoken languages</h3>
        <ul>
          {country.languages.map(language =>
            <li key={language.name}>{language.name}</li>
          )}
        </ul>
        <img className="flag" src={country.flag} alt="Country flag"></img>
  
        <h3>Weather in {country.capital}</h3>
      </div>
    ) 
  }
}

export {Country, CountryFull};
import { Component} from 'react';
import './App.css';

class WeatherApp extends Component{

  state={
    city: '', code: false, errorMessage: '', latitude: '', longitude: '', climate: '',
    minTemp: '', maxTemp: '', humid: '', pressure: '', windSpeed: '' 
  }

  onChangeSearchValue = event => {
    this.setState({city: event.target.value})
  }

  onClickSearch = async event => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=80efbd36c65ebf79a5f44ebb0c3ec719`
    const option = {
      method: 'GET'
    }

    const response = await fetch(url, option)
    const data = await response.json()
    const{coord, weather, main, wind} = data
    if (data.cod === 200) {
      this.setState({latitude: coord.lat})
      this.setState({longitude: coord.longitude})
      this.setState({climate: weather[0].description})
      this.setState({minTemp: main.temp_min})
      this.setState({maxTemp: main.temp_max})
      this.setState({humid: main.humidity})
      this.setState({pressure: main.pressure})
      this.setState({windSpeed: wind.speed})
      this.setState({code: true})
    }else{
      this.setState({code: false})
      this.setState({errorMessage: data.message})
    }
  }

  render() {

    const {city, code, errorMessage, latitude, longitude, climate, minTemp, maxTemp, humid,
    pressure, windSpeed} = this.state

    return (
      <div className="container">
        <h1 className="heading">Check Weather Forecast</h1>
        <div>
        <input type="search" placeholder="Enter the city name" className="search-box" value={city} onChange={this.onChangeSearchValue}></input>
        <button type="button" className="search-button" onClick={this.onClickSearch}>Search</button>
        </div>
        <div className="weather-report">
          {code ? <div><p className="data">C-ordinates of the {city} are : Latitude {latitude} and Longitude {longitude}</p>
          <p className="data">Climate of the {city} is {climate}</p> 
          <p className="data">Minimum temperature recorded in the {city} is {minTemp} K</p>
          <p className="data">Maximun temperature recorded in the {city} is {maxTemp} K</p>
          <p className="data">Humidity in the city is {humid}%</p>
          <p className="data">Atmospheric pressure in the city is {pressure} Pa</p>
          <p className="data">Wind speed in the city is recorded as {windSpeed} meter/second</p></div> : 
          <div>{errorMessage}</div>}
        </div>
      </div>
    )
  }
}


export default WeatherApp;

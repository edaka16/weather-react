import React from 'react';
import './App.css';
import FavoriteList from './FavoriteList';
import Details from './Details';
import Today from './Today';
import Search from './Search';
import Spinner from './Spinner';
import getWeatherData from './getWeather';
import 'antd/dist/antd.css';
import { notification } from 'antd';

  class App extends React.Component {
    
     state = {
      city: null,
      dailyData: [],
      fullData: [],
      todayTemp: null,
      error: null,
      loading: false,
      currentCity: null,

      feelsLike: null,
      tempMin: null,
      tempMax: null,
      humidity: null,

      description: null,
      clouds: null,
      dt_txt: null,
      icon:null,
      maindetail:null,
      date: null,
      windSpeed: null,
      favoriteCities: []
    }

    handleSearchChange = (event)=>{
      let updateCity = event.target.value;
      this.setState({
        city: updateCity
      });
    }

    handleCallBack = (response) => {
      let cityExists = -1
      if(this.state.favoriteCities != null){
        cityExists = this.state.favoriteCities.findIndex((item)=>{
          if(item===this.state.city){
            return true
          }
          return false
        })
      }
    

      if(cityExists === -1){
        this.setState({
          favoriteCities:[...this.state.favoriteCities, this.state.city]
        },()=>{
          this.storeFavoriteCities(this.state.favoriteCities)        
        })
      }

      
      let data = response.data.list.filter((weatherData) => weatherData.dt_txt.includes("09:00:00")) 
      let todayData = response.data.list.filter((reading) => reading.dt_txt.includes("21:00:00"))
      if(data.length <= 0){
        return null
      }

      else{
      this.setState({ 
          dailyData: todayData,
          todayTemp : data[0].main.temp,
          loading: false,
          fullData: response.data.list,
          error: null,
          currentCity: response.data.city.name,
          feelsLike: data[0].main.feels_like,
          tempMin: data[0].main.temp_min,
          tempMax: todayData[0].main.temp_max,
          humidity: data[0].main.humidity,
          description: data[0].weather[0].description,
          icon : data[0].weather[0].icon,
          maindetail: data[0].weather[0].main,
          windSpeed: data[0].wind.speed,
          date: data[0].dt
        })
      }
    }

    formatDayCards = () => {
      return this.state.dailyData.map((weatherData, index) => <Details  weatherData={weatherData}  key={index} />)
    }

    todayDetails = () => {
      const {todayTemp,feelsLike,tempMin,tempMax,humidity,icon,description,maindetail,windSpeed} = this.state;
     
      if (this.state.todayTemp !== null) {
        return <Today 
        cityName={this.state.city}
        weatherData={this.state.weatherData}
        todayTemp={todayTemp}
        feelsLike={feelsLike}
        tempMin={tempMin}
        tempMax={tempMax}
        humidity={humidity}
        icon={icon}
        description={description}
        maindetail={maindetail}
        windSpeed={windSpeed}
        date={this.state.date}
        />
      }
    }

    componentDidMount() {

      const favoriteCities = localStorage.getItem("favoriteCities")
      if(favoriteCities != null){
        this.setState({
          favoriteCities: JSON.parse(favoriteCities)
        })
      }
      
    }

    removeCity = (cityName) => {
      
      const filterdCities = this.state.favoriteCities.filter((item)=>{
        if(item===cityName){
          return false
        }
        return true
      })

      this.setState({favoriteCities: filterdCities})

      this.storeFavoriteCities(filterdCities)

    }

    storeFavoriteCities=(cities)=>{
      localStorage.clear()
      localStorage.setItem("favoriteCities", JSON.stringify(cities));
    
    }

    setSelectedCity=(city)=>{
      this.setState({city:city, loading: true},()=>{

        getWeatherData(this.state.city)
         .then(this.handleCallBack)
          .catch((error)=>{
            this.setState({
              error: "Error",
              loading: false 
            })
              notification["error"]({
              message: 'ERROR',
              description: 'City not found',
            });
          });
      })
    }

    handleSearchSubmit=(e)=>{
      e.preventDefault()

      if(this.state.city.length>=3 && this.state.favoriteCities.length <8 ){

     
        this.setState({ loading: true })

        getWeatherData(this.state.city)
         .then(this.handleCallBack)
          .catch((error)=>{
            this.setState({
              error: "Error",
              loading: false 
            })
              notification["error"]({
              message: 'ERROR',
              description: 'City not found',
            });
          });

      }
    }


    render() {
   
      return (
        <React.Fragment>
           <section className="container">
             <header className="header">
              <h1>Weather</h1>
              <form id="addItemForm" onSubmit={this.handleSearchSubmit}>
                    <Search
                      handleSearchChange={this.handleSearchChange}
                      value={this.state.city}
                    
                    />
                      <button type="submit"><i className="fa fa-search"></i>
                    </button>
                  </form>
             </header>

              <div className="body">
                <div className="list">
                    <FavoriteList 
                      cities={this.state.favoriteCities}
                      removeCity={this.removeCity}
                      setSelectedCity={this.setSelectedCity}
                    />
                </div>
               <div className="moti">
                 <div className="search-details-today">
                    {this.state.loading ? null : this.todayDetails()}
                    </div>
                    <div className="search-details">
                    {this.state.loading ? <Spinner />  : this.formatDayCards()}
                    </div>
                </div>
              </div>
       
           </section>
        </React.Fragment>
      );
    }
  }
export default App;



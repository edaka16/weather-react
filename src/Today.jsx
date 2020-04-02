import React from 'react'
import moment from 'moment'


const Today =(props)=>{

    var iconurl = "http://openweathermap.org/img/w/" + props.icon + ".png";
    const {todayTemp,feelsLike,tempMin,windSpeed,tempMax,humidity,description,maindetail,cityName} = props;
    let newDate = new Date();
    const weekday = props.date * 999.95
    
    newDate.setTime(weekday)
  
    return(          
            
            <div className="today-details">                  
                 
                    <h2 className="title"> {cityName} </h2>
                    <h5 className="title"> {moment(newDate).format("MMM Do")} </h5>
                    <img className="largeIcon" src={iconurl} alt="icon"/>
                    <p className="description" >Today temp: {todayTemp} °C </p>
                    <p className="description" >Feels like: {feelsLike} °C </p>
                    <p className="details-text-min">Min temp: {tempMin} °C </p>
                    <p className="details-text-max">Max temp: {tempMax} °C </p>
                    <p className="details-humidity">Humidity: {humidity} % </p>
                    <p className="description" >Description: {description}</p>
                    <p className="description" >Main: {maindetail}</p>
                    <p className="description" >Speed of wind: {windSpeed} m/s</p>
          
            </div>
        );
}

export default Today;
import React from 'react';
import moment from 'moment'



const Details =({weatherData})=>{

    let newDate = new Date();
    const weekday = weatherData.dt * 1000
    newDate.setTime(weekday)
    var iconurl = "http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png";

    return(          
            
            <div className="details">
                    <h4 className="title"> {moment(newDate).format("dddd")}</h4>
                    <img className="icons" src={iconurl} alt="icon-images"/>
                    <p className="details-text-min">{weatherData.main.temp_min} °C </p>
                    <p className="details-text-max">{weatherData.main.temp_max} °C </p>
            </div>
       
        );
}
export default Details;
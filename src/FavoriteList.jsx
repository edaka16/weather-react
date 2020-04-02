import React from 'react';


const Details =({cities,removeCity,setSelectedCity})=>{

    return(          
       
        <div className="list-city">
            <h4 className="listOfCities"> Favorite Cities</h4>
            {cities ? 
             <ul >
            {cities.map((city)=>(
                <li key={city}>
                    <button className="city-button" onClick={()=>{setSelectedCity(city)}}>{city}</button>
                    <button className="remove" onClick={()=>{ removeCity(city) } }>-</button>
                </li>        
            ))}
            </ul> 
            : <p>No cities</p>}
           
        </div>
       
        );
}
export default Details;
import React from 'react';


const Search =(props)=>{
    
    return(          
       
            <div className="search">
                <div className="searchForm">
                            <input
                                id="addInput"
                                value={props.city}
                                name= "city"
                                type = "text"
                                placeholder="Search for..."
                                onChange={props.handleSearchChange}                       
                            />
                        
                </div>
            </div>
       
        );
}
export default Search;
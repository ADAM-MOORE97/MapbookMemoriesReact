import react, { useState, useEffect } from 'react';

import LocationCard from './LocationCard';

export default function LocationCollection({locations}) {
  


if(locations.length > 0){
    return(
        <div className='container-fluid'>
            <div className='row'>
            {locations.map(place=><LocationCard location={place} key={place.id}/>)}
            </div>

        </div>
       
        )
}
else
    return (
        <div className> 
            <em>It appears that you have no locations added at this time. Click button below to add a new location to your collection!</em>
            <button>Location Form</button>
        </div>
    )
}

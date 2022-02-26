import react, { useState, useEffect } from 'react';
import DashMap from './DashMap';
import { useNavigate } from 'react-router-dom';
import LocationCard from './LocationCard';

export default function LocationCollection({locations}) {
  const navigate = useNavigate();


if(locations.length > 0){
    return(
        // Render map showing each Location
        <div className='container-fluid'>
            <div className='row mt-5'>
            <DashMap/>
            </div>
            
            <div className='collection row mt-2 border'>
            {locations.map(place=><LocationCard location={place} key={place.id}/>)}
            </div>

        </div>
       
        )
}
else
    return (
    // Conditional render if User has no locations within data set.
        <div className='col-9 mt-5 text-center'> 
            <em className='alert-dark m-1'>It appears that you have no locations added at this time. Click button below to add a new location to your collection!</em>
            <div>
            <button className='btn btn-dark mt-2' onClick={()=>navigate(`/locations/new`)}>Location Form</button>
            </div>
            
        </div>
    )
}

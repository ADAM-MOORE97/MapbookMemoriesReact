import react, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/user';
import LocationCard from './LocationCard';

export default function LocationCollection() {
    const { user, setUser } = useContext(UserContext);
console.log(user)
let locationArray = user.locations
if(locationArray.length > 0){
    return(
        <div className='container-fluid'>
            <div className='row'>
            {locationArray.map(location=><LocationCard location={location} key={location.id}/>)}
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
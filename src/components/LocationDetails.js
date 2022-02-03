import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LocationTripInfo from "./LocationTripInfo";
import MiniTripCard from "./MiniTripCard";

export default function LocationDetails() {
    // Params & Navigation
    const params = useParams();
    const navigate = useNavigate();
    // Location State
    const [locationDetails, setLocationDetails]=useState(false)
    // error
    const [error, setError] =useState('')
    const [tripsShown, setTripsShown] = useState(false)

    useEffect(()=>{
        fetch(`/locations/${params.id}`)
        .then(res=>{
            if(res.ok){
                res.json().then(data=>{
                console.log(data)
                    setLocationDetails(data)})
            }else{
                res.json().then(data=> {
                  
                    setError(data.errors.toString().substring(0,22))
                    
                    
                })
                setTimeout(()=>{
                    setError('')
                    navigate('/')
                }, 5000)
            }
        })
    },[])
  
    if(!locationDetails){
        
        return(
            <div>
                <h3 className="alert-danger m-1">Status: 404, {error} within your saved data, navigating back to your Dashboard...</h3>
            </div>
        )
    }
    return (
        <div>
            <h1>{locationDetails.custom_name}</h1>
            <h2>{locationDetails.mapped_address}</h2>
            <h3>{locationDetails.latitude}, {locationDetails.longitude}</h3>
            <p>{locationDetails.description}</p>
            {/* <div>{locationDetails.trips.map(trip=><MiniTripCard trip={trip}/>)}</div> */}
            <p>Trips taken: {locationDetails.trips.length}</p>
            {locationDetails.trips.length>0? <button className="btn btn-dark" onClick={()=>setTripsShown(tripsShown=>!tripsShown)}>{tripsShown? 'Hide Trips': 'Show Trips'}</button> : null}
            {tripsShown? <LocationTripInfo trips={locationDetails.trips}/> : null}
        </div>
    )
}

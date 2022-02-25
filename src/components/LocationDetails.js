import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashMap from "./DashMap";
import LocationTripInfo from "./LocationTripInfo";
import MiniTripCard from "./MiniTripCard";

export default function LocationDetails() {
    // Params & Navigation
    const params = useParams();
    const navigate = useNavigate();
    // Location State
    const [locationDetails, setLocationDetails] = useState(false)
    // error
    const [error, setError] = useState('')
    const [tripsShown, setTripsShown] = useState(false)

    useEffect(() => {
        fetch(`/locations/${params.id}`)
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        console.log(data)
                        setLocationDetails(data)
                    })
                } else {
                    res.json().then(data => {

                        setError(data.errors.toString().substring(0, 22))


                    })
                    setTimeout(() => {
                        setError('')
                        navigate('/')
                    }, 5000)
                }
            })
    }, [])

    if (!locationDetails) {

        return (
            <div>
                <h3 className="alert-danger m-1">Status: 404, {error} within your saved data, navigating back to your Dashboard...</h3>
            </div>
        )
    }
    return (
        <div className="mx-auto">
           
            <div className="mt-5"><DashMap latitude={locationDetails.latitude} longitude={locationDetails.longitude} magnify={4.5} /></div>
            <div className=" row mt-5 rounded m-5">
            <div className={tripsShown? "p-3 border rounded m-1 col text-center bg-light":"p-3 border rounded col-12 bg-light"}>
                    <h1>{locationDetails.custom_name}</h1>
                    <h2>{locationDetails.mapped_address}</h2>
                    <h3>{locationDetails.latitude}, {locationDetails.longitude}</h3>
                    <p>{locationDetails.description}</p>
                    {/* <div>{locationDetails.trips.map(trip=><MiniTripCard trip={trip}/>)}</div> */}
                    <p>Trips taken: {locationDetails.trips.length}</p>
                    {locationDetails.trips.length > 0 ? <button className="btn btn-dark" onClick={() => setTripsShown(tripsShown => !tripsShown)}>{tripsShown ? 'Hide Trips' : 'Show Trips'}</button> : null}
                    <button className="btn btn-dark m-1" onClick={()=>navigate(`/locations/${locationDetails.id}/edit`)}>Edit Location</button>
                </div>
                
                
              
                  
                  
                {tripsShown ? <div className="col p-3 m-1 border rounded"><LocationTripInfo trips={locationDetails.trips} /></div> : null}
          
               
            </div>
  
          
               
                
            </div>
         
    


    )
}

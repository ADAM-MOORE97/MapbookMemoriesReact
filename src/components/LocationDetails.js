import React, { useContext, useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";
import DashMap from "./DashMap";
import LocationTripInfo from "./LocationTripInfo";


export default function LocationDetails({setLocationData}) {
    const {user, setUser} = useContext(UserContext)
    // Params & Navigation
    const params = useParams();
    const navigate = useNavigate();
    // Location State
    const [locationDetails, setLocationDetails] = useState(false)
    // error
    const [error, setError] = useState('')
    const [tripsShown, setTripsShown] = useState(false)
    const [authError, setAuthError] = useState(false)


    // Fetch specified Location data, or render usable error message for user.
    useEffect(() => {
        fetch(`https://mapbook-memories-backend.herokuapp.com/locations/${params.id}`,{
            headers: { "Content-Type": "application/json" },
            credentials: 'include'
        })
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        console.log(data)
                        setLocationDetails(data)
                    })
                } else if (res.status === 401) {
                    res.json().then(data => setAuthError(data.errors)).then(setTimeout(() => { setUser(!user) }, 5000))
                }
                else {
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
    const handleDelete = (place) =>{
        fetch(`https://mapbook-memories-backend.herokuapp.com/locations/${place.id}`, {
            method: 'DELETE',
            credentials: 'include'
        }).then(r=> {
            if(r.status === 401){
                r.json().then(data => setAuthError(data.errors)).then(setTimeout(() => { setUser(!user) }, 5000))
            } else {
                r.json().then(data=>{
                    setLocationData(data)
                    navigate('/locations')
                })
            }
        }
    )}

    if (!locationDetails) {
        // Error message for user if no Location is found within user's data set.
        return (
            <div>
                {error ? <h3 className="alert-danger m-1">Status: 404, {error} within your saved data, navigating back to your Dashboard...</h3> : null}
                {authError ? authError.map(error => <p className="alert-danger m-1">*{error}. Session expired, routing back to Login Page...</p>) : null}

            </div>
        )
    }
    return (
        // render map zoomed to specific Location, button to display trips that relate to specified Location.
        <div className="mx-auto">

            <div className="mt-5"><DashMap latitude={locationDetails.latitude} longitude={locationDetails.longitude} magnify={4.5} /></div>
            <div className=" row mt-5 rounded m-5">
                <div className={tripsShown ? "p-3 border rounded m-1 col text-center bg-light" : "p-3 border rounded col-12 bg-light"}>
                    <h1>{locationDetails.custom_name}</h1>
                    <h2>{locationDetails.mapped_address}</h2>
                    <h3>{locationDetails.latitude}, {locationDetails.longitude}</h3>
                    <p>{locationDetails.description}</p>
                    <p>Trips taken: {locationDetails.trips.length}</p>
                    {locationDetails.trips.length > 0 ? <button className="btn btn-dark" onClick={() => setTripsShown(tripsShown => !tripsShown)}>{tripsShown ? 'Hide Trips' : 'Show Trips'}</button> : null}
                    <button className="btn btn-dark m-1" onClick={() => navigate(`/locations/${locationDetails.id}/edit`)}>Edit Location</button>
                    <button className="btn btn-dark m-1" onClick={() => handleDelete(locationDetails)}>Delete Location</button>
                </div>





                {tripsShown ? <div className="col p-3 m-1 border rounded"><LocationTripInfo trips={locationDetails.trips} /></div> : null}


            </div>




        </div>




    )
}

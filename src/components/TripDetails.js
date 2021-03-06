import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from "../context/user";
import { useParams, useNavigate } from "react-router-dom";
import ImageCard from './ImageCard';
import DashMap from './DashMap';


export default function TripDetails({setTripData}) {
    const { user, setUser } = useContext(UserContext)

    const params = useParams();
    const navigate = useNavigate();
    const [tripDetails, setTripDetails] = useState(false)
    const [locationDetails, setLocationDetails] = useState({})
    const [error, setError] = useState(false)
    const [authError, setAuthError] = useState(false)
    const [showImg, setShowImg] = useState(false)
    const [showLocation, setShowLocation] = useState(false)
    // fetch specified trip data given id.
    const URL = 'https://mapbook-memories-backend.herokuapp.com'

    useEffect(() => {
        fetch(`${URL}/trips/${params.id}`,{
            headers: { "Content-Type": "application/json" },
            credentials: 'include'
        })
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        console.log(data)
                        setTripDetails(data)
                        fetch(`${URL}/locations/${data.location_id}`,{
                            headers: { "Content-Type": "application/json" },
                            credentials: 'include'
                        })
                            .then(r => r.json())
                            .then(data => setLocationDetails(data))
                    })
                } else if (res.status === 401) {
                    res.json().then(data => setAuthError(data.errors)).then(setTimeout(() => { setUser(!user) }, 5000))
                } else {
                    res.json().then(data => {

                        setError(data.errors.toString().substring(0, 18))
                        console.log(`errors: ${data.errors.toString().substring(0, 18)}`)

                    })
                    setTimeout(() => {
                        setError(false)
                        navigate('/')
                    }, 5000)
                }
            })
    }, [params.id, navigate])
    const handleDelete = (trip) =>{
        fetch(`${URL}/trips/${trip.id}`,{
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            credentials: 'include'
        }).then(r=> {
            if(r.status === 401){
                r.json().then(data => setAuthError(data.errors)).then(setTimeout(() => { setUser(!user) }, 5000))
            } else {
                r.json().then(data=>{
                    setTripData(data)
                    console.log(data)
                    navigate('/trips')
                })
            }
        }
    )
    }
    // Render error message of Fetch for requested Trip data fails.
    if (error || !tripDetails) {

        return (
            <div>
                {error ? <h3 className="alert-danger m-1">Status: 404, {error} within your saved data, navigating back to your Dashboard...</h3> : null}
                {authError ? authError.map(error => <p className="alert-danger m-1">*{error}. Session expired, routing back to Login Page...</p>) : null}

            </div>
        )
    }
console.log(tripDetails.attachment_urls)
    return (
        // Render Trip Details
        <div className='vh-75'>





            <div className='border-bottom border-dark mt-2 col-10 text-center p-4'>
                <div className='bg-light rounded border'>
                    <h1>{tripDetails.name}</h1>
                    <h2>{tripDetails.start_date.substring(5, 10)} to {tripDetails.end_date.substring(5, 10)} / {tripDetails.end_date.substring(0, 4)}</h2>
                </div>
                <div className='text-center m-5'>
                    <em>{tripDetails.description} <i className="bi bi-pen"></i></em>
                </div>

                {tripDetails.attachment_urls.length > 0 ?
                    <div>
                        <button className='btn btn-dark' onClick={() => setShowImg(!showImg)}>Show Images</button>
                        <button className='btn btn-dark m-1' onClick={() => setShowLocation(!showLocation)}>Show Location Info</button>
                        <button className='btn btn-dark' onClick={() => navigate(`/trips/${tripDetails.id}/edit`)}>Edit Trip</button>
                        <button className='btn btn-dark m-1' onClick={() => handleDelete(tripDetails)}>Delete Trip</button>
                    
                    </div> : <div>
                        <button className='btn btn-dark m-1' onClick={() => setShowLocation(!showLocation)}>Show Location Info</button>
                        <button className='btn btn-dark' onClick={() => navigate(`/trips/${tripDetails.id}/edit`)}>Edit Trip</button>
                        <button className='btn btn-dark m-1' onClick={() => handleDelete(tripDetails)}>Delete Trip</button>
                    </div>}
            </div>
            {showLocation ? <div className=' col-10 border-dark border-bottom mt-2 p-4'> <DashMap latitude={locationDetails.latitude} longitude={locationDetails.longitude} magnify={4.5} /> </div> : null}
            {showImg ? <div className='container col-10 mt-2'> <ImageCard gallery={false} image_urls={tripDetails.attachment_urls} key={tripDetails.id} trip={tripDetails} /></div> : null}
        </div>




    )
}

import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/user';
import { useParams, useNavigate } from "react-router-dom";
import PlaceFormMap from './PlaceFormMap';

export default function LocationForm({ setLocationData }) {
    // Current User
    const { user, setUser } = useContext(UserContext);

    // Navigation and Params
    const params = useParams();
    const navigate = useNavigate();

    // Form field data
    const [custom_name, setCustom_Name] = useState('')
    const [mapped_address, setMapped_Address] = useState('')
    const [place_type, setPlace_Type] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [description, setDescription] = useState('')
    const [visited, setVisited] = useState(false)
    // Error handling
    const [errors, setErrors] = useState(false)
    const [fetchError, setFetchError] = useState(false)
    const [authError, setAuthError] = useState(false)

    // Help Message
    const [help, setHelp] = useState(false)
    const URL = 'https://mapbook-memories-backend.herokuapp.com'

    useEffect(() => {
        // Conditionally render Location info for updating data into form.
        if (params.id) {
            fetch(`${URL}/locations/${params.id}`,{
                headers: { "Content-Type": "application/json" },
                credentials: 'include'
            })
                .then(res => {
                    if (res.ok) {
                        res.json().then(data => {
                            setCustom_Name(data.custom_name)
                            setMapped_Address(data.mapped_address)
                            setPlace_Type(data.place_type)
                            setLatitude(data.latitude)
                            setLongitude(data.longitude)
                            setDescription(data.description)
                            setVisited(data.visited)
                        })
                    } else {
                        res.json().then(data => {
                            console.log(data)
                            setFetchError(data.errors.toString().substring(0, 22))
                        })
                        setTimeout(() => navigate('/'), 3000)
                    }
                })
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const locationInfo = new FormData();
        locationInfo.append('custom_name', custom_name)
        locationInfo.append('mapped_address', mapped_address)
        locationInfo.append('place_type', place_type)
        locationInfo.append('latitude', latitude)
        locationInfo.append('longitude', longitude)
        locationInfo.append('description', description)
        locationInfo.append('visited', visited)

        // Conditionally add or update form given circumstance of component.
        fetch(params.id ? `${URL}/locations/${params.id}` : `${URL}/locations`, {
            method: params.id ? 'PATCH' : 'POST',
            credentials: 'include',
            body: locationInfo
        }).then(res => {
            if (res.ok) {
                res.json().then(data => {
                    setLocationData(data)
                    navigate(`${URL}/locations/${data.id}`)
                })
            } else if (res.status === 422) {
                res.json().then(data => {

                    let custom = data.errors.filter(error => error.includes('Custom'))
                    let mapped = data.errors.filter(error => error.includes('Mapped'))
                    let place = data.errors.filter(error => error.includes('Place'))
                    let description = data.errors.filter(error => error.includes('Description'))
                    let latitude = data.errors.filter(error => error.includes('Latitude'))
                    let longitude = data.errors.filter(error => error.includes('Longitude'))
                    setErrors({
                        custom: custom,
                        mapped: mapped,
                        place: place,
                        description: description,
                        latitude: latitude,
                        longitude: longitude,

                    })
                    setTimeout(() => setErrors(false), 10000)
                })
            } else {
                console.log(res.json())
                res.json().then(data => setAuthError(data.errors)).then(setTimeout(() => { setUser(!user) }, 5000))

            }
        })
    }

    const helpMessage = () => {
        setHelp(true)
        setTimeout(() => setHelp(false), 10000)
    }

    if (fetchError) {
        return (
            <div>
                <h3 className="alert-danger m-1">Status: 404, {fetchError} within your saved data, navigating back to your Dashboard...</h3>
            </div>
        )
    }
    return (
        // Add interactive map, error messages, help messages, and form usability for communication with backend.
        <div className='container mt-5'>
            <PlaceFormMap setMapped_Address={setMapped_Address} setPlace_Type={setPlace_Type} setLatitude={setLatitude} setLongitude={setLongitude} />
            <div className='text-center'>
                <i role='button' className="bi bi-info-circle mt-3" onClick={helpMessage}></i>
                {help ? <p className='alert-dark m-1'>Search for a Location using the Map and appropriate fields will be filled. Remaining fields are customizable at the user's discretion. Thank you, and enjoy! </p> : null}
            </div>
            <div >
                {authError ? authError.map(error => <p className="alert-danger m-1">*{error}. Session expired, routing back to Login Page...</p>) : null}
                <form onSubmit={(e) => handleSubmit(e)} className='placeform mt-3 border mx-auto pb-5 h-100 text-center w-100' >

                    <label className='form-label mt-3'> Custom Name</label>

                    <input className='form-control border-dark' type='text' name='custom_name' value={custom_name} onChange={(e) => setCustom_Name(e.target.value)}></input>
                    {errors ? errors.custom.map(error => <p className="alert-danger m-1">*{error}.</p>) : null}




                    <label className='form-label mt-3'>Mapped Address</label>

                    <input className='form-control border-dark' type='text' name='mapped_address' value={mapped_address} onChange={(e) => setMapped_Address(e.target.value)}></input>
                    {errors ? errors.mapped.map(error => <p className="alert-danger m-1">*{error}.</p>) : null}


                    <label className='form-label mt-3'>Location Type</label>

                    <input className='form-control border-dark' type='text' name='place_type' value={place_type} onChange={(e) => setPlace_Type(e.target.value)}></input>
                    {errors ? errors.place.map(error => <p className="alert-danger m-1">*{error}.</p>) : null}


                    <label className='form-label mt-3'>Latitude</label>

                    <input className='form-control border-dark' type='text' name='latitude' value={latitude} onChange={(e) => setLatitude(e.target.value)}></input>
                    {errors ? errors.latitude.map(error => <p className="alert-danger m-1">*{error}.</p>) : null}


                    <label className='form-label mt-3'>Longitude</label>

                    <input className='form-control border-dark' type='text' name='longitude' value={longitude} onChange={(e) => setLongitude(e.target.value)}></input>
                    {errors ? errors.longitude.map(error => <p className="alert-danger m-1">*{error}.</p>) : null}


                    <label className='form-label mt-3'>Description</label>

                    <textarea className='form-control border-dark' type='text' name='description' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    {errors ? errors.description.map(error => <p className="alert-danger m-1">*{error}.</p>) : null}


                    <label className='form-label mt-3'>Visited </label>
                    <br></br>
                    <input className='border-dark visitbox' type='checkbox' checked={visited} name="visited" onChange={(e) => setVisited(e.target.checked)}></input>

                    <br></br>
                    <button className='btn btn-dark mt-3 '>Submit</button>

                </form>

            </div>
        </div>
    )
}

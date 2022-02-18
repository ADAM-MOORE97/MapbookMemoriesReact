import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/user';
import { useParams, useNavigate } from "react-router-dom";
import PlaceFormMap from './PlaceFormMap';

export default function LocationForm({setLocationData}) {
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

useEffect(() =>{
    if(params.id){
        fetch(`/locations/${params.id}`)
        .then(res=>{
            if(res.ok){
                res.json().then(data =>{
                    setCustom_Name(data.custom_name)
                    setMapped_Address(data.mapped_address)
                    setPlace_Type(data.place_type)
                    setLatitude(data.latitude)
                    setLongitude(data.longitude)
                    setDescription(data.description)
                    setVisited(data.visited)
                })
            } else{
                res.json().then(data=>{
                    console.log(data)
                    setFetchError(data.errors.toString().substring(0,22))
                })
                setTimeout(()=>navigate('/'), 3000)
            }
        })
    }
},[])

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
        // locationInfo.append('user_id', user.id)

        fetch(params.id? `/locations/${params.id}`:'/locations', {
            method: params.id? 'PATCH':'POST',
            body: locationInfo
        }).then(res => {
            if (res.ok) {
                res.json().then(data => {
                    setLocationData(data)
                    navigate(`/locations/${data.id}`)
                })
            } else {
                res.json().then(data => {
                    console.log(data.erros)
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
                        longitude: longitude
                    })
                    setTimeout(() => setErrors(false), 10000)
                })
            }
        })
    }
if(fetchError){
    return(
        <div>
        <h3 className="alert-danger m-1">Status: 404, {fetchError} within your saved data, navigating back to your Dashboard...</h3>
    </div>
    )
}
    return (
        <div className='container mt-5'>
            <PlaceFormMap setMapped_Address={setMapped_Address} setPlace_Type={setPlace_Type} setLatitude={setLatitude} setLongitude={setLongitude} />

            <div >
                <form onSubmit={(e) => handleSubmit(e)} className=' border m-5 text-center' >

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

                    <input className='form-control border-dark' type='text' name='description' value={description} onChange={(e) => setDescription(e.target.value)}></input>
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

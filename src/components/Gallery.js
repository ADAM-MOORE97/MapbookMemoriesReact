import React, { useState, useEffect } from 'react';
import ImageCard from './ImageCard';
import { useNavigate } from 'react-router-dom';

export default function Gallery() {
    // set State variables for search and render functions.
    const [tripData, setTripData] = useState([])
    const [filteredTrip, setFilteredTrip] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        fetch('/trips')
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        setTripData(data)
                        setFilteredTrip(data)
                        
                    })
                } else {
                    res.json().then(data => {
                        console.log(data.errors.toString())
                    })
                }
            })
    }, [])
// Search through rendered Trip data given Name of Trip.
    function handleChange(e) {
        let filteredData = tripData.filter((trip) => trip.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setFilteredTrip(filteredData)
    }
    function handleSubmit(e) {
        e.preventDefault()


    }
    if(tripData.length > 0){
    return (
        // Render search bar and container for image 'cards'
        <div className='justify-content-center'>
            <div className='w-75 flex'>
                <form onSubmit={handleSubmit} className="text-center">
                    <input
                        className="form-control me-2 border-dark"
                        role="search"
                        type="search"
                        placeholder="Search by trip name "
                        aria-label="Search"
                        onChange={handleChange}
                    />
                </form>
            </div>
            <div className='container'>
                {filteredTrip.map((trip) => {
                    return <ImageCard image_urls={trip.attachment_urls} key={trip.attachment_urls} trip={trip} />
                })}
            </div>

        </div>

    );}
    return(

            <div className='col-9 mt-5 text-center'>
                <em className='alert-dark m-1'>It appears that you have no trips added at this time. Click button below to add a new trip to your collection!</em>
                <div>
                    <button className='btn btn-dark mt-2' onClick={() => navigate(`/trips/new`)}>Trip Form</button>
                </div>
    
            </div>
        
    )
}

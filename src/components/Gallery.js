import React, { useState, useEffect } from 'react';
import ImageCard from './ImageCard';

export default function Gallery() {
    const [tripData, setTripData] = useState([])
    const [filteredTrip, setFilteredTrip] = useState([])
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

    function handleChange(e) {
        let filteredData = tripData.filter((trip) => trip.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setFilteredTrip(filteredData)
    }
    function handleSubmit(e) {
        e.preventDefault()


    }
    return (
        <div className='justify-content-center'>
            <div className='w-75 flex'>
                <form onSubmit={handleSubmit} className="text-center">
                    <input
                        className="form-control me-2 "
                        role="search"
                        type="search"
                        placeholder="Search by trip name "
                        aria-label="Search"
                        onChange={handleChange}
                    />
                </form>
            </div>
            <div className='container'>
                {filteredTrip.map((trip)=>{
                    return <ImageCard className="mt-2" key={trip.id} trip={trip}/>
                })}
            </div>

        </div>

    );
}

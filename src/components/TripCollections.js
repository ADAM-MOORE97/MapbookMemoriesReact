import React from 'react'
import TripCard from './TripCard'
import { useNavigate } from 'react-router-dom'

export default function TripCollections({ trips }) {
    const navigate = useNavigate();
    // Conditionally render Trip Collection information if user has trips.
    if (trips.length > 0) {
        return (
            <div className='container-fluid'>
                <div className='row mt-5 border collection'>
                    {trips.map(trip => <TripCard trip={trip} key={trip.id} />)}
                </div>
            </div>
        )
    }
    // Display message if user has no trips for Collection, add navigation to trip form.
    return (
        <div className='col-9 mt-5 text-center'>
            <em className='alert-dark m-1'>It appears that you have no trips added at this time. Click button below to add a new trip to your collection!</em>
            <div>
                <button className='btn btn-dark mt-2' onClick={() => navigate(`/trips/new`)}>Trip Form</button>
            </div>

        </div>
    )
}

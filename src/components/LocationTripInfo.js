import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ({ trips }) {
const navigate = useNavigate();
// Add small detail trip info for Location Details, and navigation to clicked on Trip Details.
    return(
        <>
    {trips.map(trip=>
        {return(
        <div key={trip.id} className='col d-flex m-2'>

            <div className='card flex-fill border-dark'>
                <div className='card-body'>
                    <h5 className='card-title'>{trip.name}</h5>

                    <h6 className='card-subtitle mb-2 text-muted'>{trip.start_date} to {trip.end_date}</h6>

                    <div className='card-text'>Taken: {trip.taken.toString()}</div>

                </div>
                <div className='card-footer border-top border-dark bg-secondary'>

                    <button className='btn btn-dark' onClick={() => { navigate(`/trips/${trip.id}`) }}>Full Details</button>
                </div>

            </div>

        </div>)})}</>)
      
}

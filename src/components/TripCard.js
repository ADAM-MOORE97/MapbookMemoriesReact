import React from 'react'
import { useNavigate } from "react-router-dom";


export default function TripCard({trip}) {
// Render animation conditional to whether trip was 'taken' or not.
    const navigate = useNavigate();
    let visitAnimation = <svg className={trip.taken ? "checkmark" : "xmark"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
        <circle className={trip.taken ? "checkmark__circle" : "xmark"} cx="26" cy="26" r="25" fill="none" />
        <path className={trip.taken? "checkmark__check" : "xmark"} fill="none" d={trip.taken ? "M14.1 27.2l7.1 7.2 16.7-16.8" : "M16 16 36 36 M36 16 16 36"} />
    </svg>

    return (
    // Render Trip cards for Collection.
        <div className='col d-flex m-2'>
        <div className='card flex-fill border-dark'>
            <div className='card-body'>
                <h5 className='card-title'>{trip.name}</h5>
          
                <h6 className='card-subtitle mb-2 text-muted'>{trip.start_date} to {trip.end_date}</h6>
                {trip.atta}
                <div className='card-text'>Taken: {visitAnimation}</div>

            </div>
            <div className='card-footer border-top border-dark bg-secondary'>

                <button className='btn btn-dark' onClick={() => { navigate(`/trips/${trip.id}`) }}>Full Details</button>
            </div>

        </div>

    </div>
    )
}

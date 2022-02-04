import React from 'react'
import TripCard from './TripCard'

export default function TripCollections({trips}) {
    console.log(trips)

    if(trips.length>0){
        return(
            <div className='container-fluid'>
                <div className='row mt-2'>
                    {trips.map(trip=><TripCard trip={trip} key={trip.id}/>)}
                </div>
            </div>
        )
    }
    return (
        <div>
            <p>Trip Collection</p>
        </div>
    )
}

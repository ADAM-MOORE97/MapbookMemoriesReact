import react, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/user';
import { Link } from 'react-router-dom'
import DashMap from './DashMap';

export default function Dashboard({ trips, locations }) {
    const { user, setUser } = useContext(UserContext);
    console.log(user)
    let tripTaken = trips.length > 0 ? trips.filter(trip => trip.taken === true).length : 0
    let tripPlanned = trips.length > 0 ? trips.filter(trip => trip.taken === false).length : 0
    let locationVisited = locations.length > 0 ? locations.filter(location => location.visited === true).length : 0
    let locationPlanned = locations.length > 0 ? locations.filter(location => location.visited === false).length : 0


    return (
        <div>



            <DashMap />

            <div className='container'>
                <div className='row'>

                    <div className='col mt-5 border text-center text-light bg-dark'>
                        <h6 className='text'>Trips Taken:{tripTaken} </h6>
                        <h6 className='text'>Trips Planned:{tripPlanned} </h6>






                        </div>
                        <div className='col mt-5 border text-center text-light bg-dark '>
                            <h6 className='text'>Locations Visited: {locationVisited} </h6>
                            <h6 className='text'>Future Locations: {locationPlanned} </h6>

                        </div>
                    
                </div>
            </div>
        </div>







    )
}

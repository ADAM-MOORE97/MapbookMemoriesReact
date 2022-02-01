import react, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/user';
import {Link} from 'react-router-dom'
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
            
            

              
            <h1>Welcome to Mapbook Memories {user.username}</h1>
            <div className='container'>
                <div className='row'>
                    <DashMap/>
                    <div className='col-xs-3 mt-5 border center'>
                        <h6 className='text'>Trips Taken:{tripTaken} </h6>
                        <h6 className='text'>Trips Planned:{tripPlanned} </h6>
                        {/* <Link to="/trips/gallery">
        <button className='btn btn-dark m-2'>Gallery</button>
        </Link>
        <Link to="/trips/collection">
            <button className='btn btn-dark m-2'>See All</button>
        </Link>
        <Link to='/trips/new'>
        <button className='btn btn-dark m-2'>Add</button>
        </Link> */}


                    </div>

                </div>
                <div className='row'>
                
                    <div className='col-xs-3 mt-5 border '>
                        <h6 className='text'>Locations Visited: {locationVisited} </h6>
                        <h6 className='text'>Future Locations: {locationPlanned} </h6>
                        
        <Link to="/locations">
            <button className='btn btn-dark m-2'>See All</button>
        </Link>
        <Link to='/locations/new'>
        <button className='btn btn-dark m-2'>Add</button>
        </Link>

                    </div>
                </div>
                <h2>Check out our interactive map below!</h2>
        
            </div>
           
        </div>

    )
}

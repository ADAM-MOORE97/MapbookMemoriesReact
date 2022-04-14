import DashMap from './DashMap';

export default function Dashboard({ trips, locations }) {


    let tripTaken = trips.length > 0 ? trips.filter(trip => trip.taken === true).length : 0
    let tripPlanned = trips.length > 0 ? trips.filter(trip => trip.taken === false).length : 0
    let locationVisited = locations.length > 0 ? locations.filter(location => location.visited === true).length : 0
    let locationPlanned = locations.length > 0 ? locations.filter(location => location.visited === false).length : 0


    return (
       



           

            <div className='container mt-5'>
             
                <DashMap />
               
                <div className='row '>

                    <div className='col mt-5 border text-center text-light bg-dark'>
                        <h5>Trips</h5>
                        <h6 className='text'>Taken:{tripTaken} </h6>
                        <h6 className='text'>Planned:{tripPlanned} </h6>






                        </div>
                        <div className='col mt-5 border text-center text-light bg-dark '>
                            <h5>Locations</h5>
                            <h6 className='text'>Visited: {locationVisited} </h6>
                            <h6 className='text'>Planned: {locationPlanned} </h6>

                        </div>
                    
                </div>
            </div>
     







    )
}

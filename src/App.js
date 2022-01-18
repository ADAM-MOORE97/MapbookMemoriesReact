import react, {useState, useContext, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom'
import { UserContext } from './context/user';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import LandingPage from './components/LandingPage';
import Navabar from './components/Navabar';
import Dashboard from './components/Dashboard';
import LocationCollection from './components/LocationCollection';
import LocationForm from './components/LocationForm';
import LocationDetails from './components/LocationDetails';
import TripCollections from './components/TripCollections';
import TripForm from './components/TripForm';
import TripDetails from './components/TripDetails';




function App() {
  const {user, setUser} = useContext(UserContext);
  const [locationData, setLocationData] = useState([])
  const [tripData, setTripData] = useState([])
// console.log(`${process.env.REACT_APP_BACKEND_URL}/authenticate`)
  useEffect(() => {
    fetch(`/authenticate`)
      .then(resp => {
        if (resp.ok){
          resp.json().then(data=> {setUser(data)
    })
        }
        else {
          resp.json().then(errors=> console.log(errors))
        }})
      }, [tripData, locationData])


  if(!user)
    return( <LandingPage/>)
  else
  
  return (
    <div>
      <Navabar/>
      <Routes>
        <Route path='/' element={<Dashboard trips={user.trips} locations={user.locations}/>}></Route>
        <Route path='/locations' element={<LocationCollection/>}></Route>
        <Route path='/locations/new' element={<LocationForm/>}></Route>
        <Route path='/locations/:id/edit' element={<LocationForm/>}></Route>
        <Route path='/locations/:id' element={<LocationDetails/>}></Route>
        <Route path='/trips' element={<TripCollections/>}></Route>
        <Route path='/trips/new' element={<TripForm/>}></Route>
        <Route path='/trips/:id/edit' element={<TripForm/>}></Route>
        <Route path='/trips/:id' element={<TripDetails/>}></Route>
      </Routes>
      
    </div>
  );
}

export default App;

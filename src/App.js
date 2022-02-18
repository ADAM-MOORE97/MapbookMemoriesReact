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
import Gallery from './components/Gallery';
import Footer from './components/Footer';




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
            console.log(data)
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
        <Route path='/locations' element={<LocationCollection locations={user.locations}/>}></Route>
        <Route path='/locations/new' element={<LocationForm setLocationData={setLocationData}/>}></Route>
        <Route path='/locations/:id/edit' element={<LocationForm setLocationData={setLocationData}/>}></Route>
        <Route path='/locations/:id' element={<LocationDetails/>}></Route>
        <Route path='/trips' element={<TripCollections trips={user.trips}/>}></Route>
        <Route path='/trips/new' element={<TripForm setTripData={setTripData}/>}></Route>
        <Route path='/trips/:id/edit' element={<TripForm setTripData={setTripData}/>}></Route>
        <Route path='/trips/:id' element={<TripDetails/>}></Route>
        <Route path='/trips/gallery' element={<Gallery/>}></Route>
      </Routes>
      <div className='mt-5'>
      <Footer/>
      </div>
    </div>
  );
}

export default App;

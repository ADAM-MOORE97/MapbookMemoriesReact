import react, {useState, useContext, useEffect} from 'react';
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom'
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
import About from './components/About';




function App() {
  const {user, setUser} = useContext(UserContext);
  const [locationData, setLocationData] = useState([])
  const [tripData, setTripData] = useState([])
  const navigate = useNavigate()
// console.log(`${process.env.REACT_APP_BACKEND_URL}/authenticate`)
  useEffect(() => {
    fetch(`https://mapbook-memories-backend.herokuapp.com/authenticate`,{
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
    })
      .then(resp => {
        if (resp.ok){
          resp.json().then(data=> {setUser(data)
            
    })
        }
        else {
          resp.json().then(errors=> 
          {  
            console.log(errors)
           
            navigate('/')
          }
          )
        }})
      }, [tripData, locationData])

     
  if(!user)
    return( <LandingPage/>)
  else
  
  return (
    <div className='vh-100 vw-100'>
      <Navabar/>
      <Routes>
        <Route path='/' element={<Dashboard trips={user.trips} locations={user.locations}/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/locations' element={<LocationCollection locations={user.locations}/>}></Route>
        <Route path='/locations/new' element={<LocationForm setLocationData={setLocationData}/>}></Route>
        <Route path='/locations/:id/edit' element={<LocationForm setLocationData={setLocationData}/>}></Route>
        <Route path='/locations/:id' element={<LocationDetails setLocationData={setLocationData}/>}></Route>
        <Route path='/trips' element={<TripCollections trips={user.trips}/>}></Route>
        <Route path='/trips/new' element={<TripForm setTripData={setTripData}/>}></Route>
        <Route path='/trips/:id/edit' element={<TripForm setTripData={setTripData}/>}></Route>
        <Route path='/trips/:id' element={<TripDetails setTripData={setTripData}/>}></Route>
        <Route path='/trips/gallery' element={<Gallery/>}></Route>
      </Routes>
      <div className='mt-5 '>
        <br></br>
        <br></br>
      <Footer/>
      </div>
    </div>
  );
}

export default App;

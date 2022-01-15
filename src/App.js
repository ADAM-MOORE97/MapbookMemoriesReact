import react, {useState, useContext, useEffect} from 'react';
import { UserContext } from './context/user';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import LandingPage from './components/LandingPage';
import Navabar from './components/Navabar';
import Dashboard from './components/Dashboard';



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
      <Dashboard trips={user.trips} locations={user.locations}/>
  
    </div>
  );
}

export default App;

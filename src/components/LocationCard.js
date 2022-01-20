import React from 'react'
import { useNavigate } from "react-router-dom";



export default function LocationCard({ location }) {
    const navigate = useNavigate();
    let coords = `(${location.latitude}, ${location.longitude})`
    let visitAnimation =             <svg class={location.visited?"checkmark":"xmark"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
    <circle class={location.viewBox?"checkmark__circle": "xmark"} cx="26" cy="26" r="25" fill="none" />
    <path class={location.visited?"checkmark__check":"xmark"} fill="none" d={location.visited?"M14.1 27.2l7.1 7.2 16.7-16.8":"M16 16 36 36 M36 16 16 36"} />
  </svg>
    console.log(location)
    
    return (
        <div className='col d-flex'>
            <div className='card flex-fill'>
                <div className='card-body'>
                    <h5 className='card-title'>{location.custom_name}</h5>
                    {/* <p className='card-subtitle  mb-2 text-muted'>{coords}</p> */}
                    <h6 className='card-subtitle mb-2 text-muted'>{location.mapped_address}</h6>
                    {/* <p className='card-text'>{location.description}</p> */}
                    <p className='card-text'>Visited: {visitAnimation}</p>
                  
                </div>
                <div className='card-footer'>
                    
                    <button className='btn btn-dark' onClick={() => { navigate(`/locations/${location.id}`) }}>Full Details</button>
                    </div>

            </div>

            {/* <svg class={location.visited?"checkmark":"xmark"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
  <circle class={location.viewBox?"checkmark__circle": "xmark"} cx="26" cy="26" r="25" fill="none" />
  <path class={location.visited?"checkmark__check":"xmark"} fill="none" d={location.visited?"M14.1 27.2l7.1 7.2 16.7-16.8":"M16 16 36 36 M36 16 16 36"} />
</svg> */}
        </div>
    )
}

import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function LocationDetails() {
    // Params & Navigation
    const params = useParams();
    const navigate = useNavigate();
    // Location State
    const [locationDetails, setLocationDetails]=useState(false)
    // error
    const [error, setError] =useState('')

    useEffect(()=>{
        fetch(`/locations/${params.id}`)
        .then(res=>{
            if(res.ok){
                res.json().then(data=>console.log(data))
            }else{
                res.json().then(data=> {
                  
                    setError(data.errors.toString().substring(0,22))
                    
                    
                })
                setTimeout(()=>{
                    setError('')
                    navigate('/')
                }, 5000)
            }
        })
    },[])
    if(!locationDetails){
        return(
            <div>
                <h3 className="alert-danger m-1">{error} within your saved data, navigating back to your Dashboard.....</h3>
            </div>
        )
    }
    return (
        <div>
            <p>LOCO DETAILS</p>
        </div>
    )
}

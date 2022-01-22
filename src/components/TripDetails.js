import React, {useEffect, useState} from 'react'

export default function TripDetails() {
    const [src, setSrc]= useState(false)
useEffect(()=>{
    fetch(`/trips/1`)
    .then(r=>r.json())
    .then(data=>{
        console.log(data)
        console.log(data.attachment_urls)
        setSrc(data.attachment_urls)})
    },[])
    console.log(src)
    return (
        <div>
            <p>Trip Details</p>
            {/* {src.map(pics=><img src={pics}></img>)} */}
            {src?<img src={src[1]}></img> : null}
        </div>
    )
}

import React, {useEffect, useState} from 'react'

export default function TripDetails() {
    const [src, setSrc]= useState()
useEffect(()=>{
    fetch(`/trips/1`)
    .then(r=>r.json())
    .then(data=>console.log(data))
    },[])
    return (
        <div>
            <p>Trip Details</p>
            {/* {src.map(pics=><img src={pics}></img>)} */}
            <img src='http://localhost:3000/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBFQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e3da8edf05fb1b061f07b2d52739b39855e8aa20/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2QzNKbGMybDZaVWtpRERNd01IZ3pNREFHT3daVSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--baf18946808fba18c5af7746ecd56a0271f13cb2/t-shirt-mockup-of-a-happy-woman-wearing-headphones-to-listen-to-music-m2388-r-el2.png'></img>
        </div>
    )
}

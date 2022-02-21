import React from 'react'
import {useState} from 'react'



export default function ImageCard({trip, image_urls}) {
    const [toggle, setToggle] = useState(false)
const handleclick = (url) =>{
    
}


return(
    <div className='row mt-2 justify-content-center mx-auto border-bottom p-4 border-dark'>
    <h2 className='text-center'>{trip.name}</h2>
    <h3 className='text-center'>{trip.start_date.substring(5,11)} to {trip.end_date.substring(5,11)}</h3>
    {image_urls.map(url=>{
        return(
            <div key={trip.attachment_url} className='col-3 card p-2 m-2 border-dark'>
             <div className='bg-dark d-flex rounded p-2 w-100 h-100 justify-content-center'>
                <img className='rounded img-fluid trip-image' src={url} alt={trip.name} onClick={()=>setToggle(true)}/>
                </div>
            <div className='text-center bg-light w-100 rounded card-body border'>
                <p className='card-text polaroid-font' onClick={()=>console.log(trip)}>{trip.name}</p>
               </div> 
          
            </div>
            
        )
    })}
     
    </div>
)

}

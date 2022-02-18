import React from 'react'
import {useState} from 'react'
import EnlargeImage from './EnlargeImage'


export default function ImageCard({trip}) {
    const [toggle, setToggle] = useState(false)
const handleclick = (url) =>{
    
}
return(
    <div className='row justify-content-center mx-auto'>
    {trip.attachment_urls.map(url=>{
        return(
            <div key={trip.attachment_url} className='col-3 card p-2 m-2 border-dark'>
             <div className='bg-dark d-flex rounded p-2 w-100 h-100 justify-content-center'>
                <img className='rounded img-fluid trip-image' src={url} alt={trip.name} onClick={()=>setToggle(true)}/>
                </div>
            <div className='text-center bg-light w-100 rounded card-body border'>
                <p className='card-text polaroid-font' onClick={()=>console.log(trip.attachment_url_big)}>{trip.name}</p>
               </div> 
          
            </div>
            
        )
    })}
      {toggle? <EnlargeImage
              url={trip.attachment_url_big}
              handleClose={setToggle(!toggle)}
              /> : null}
    </div>
)
}

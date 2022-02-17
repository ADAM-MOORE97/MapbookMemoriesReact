import React from 'react'


export default function ImageCard({trip}) {

return(
    <div className='m-5 d-flex container'>
    {trip.attachment_urls.map(url=>{
        return(
            <div className='card p-2 border-dark'>
             <div className='bg-dark rounded p-2'>
                <img className='w-50 row center-block rounded mx-auto' src={url}/>
                </div>
            <div className='text-center bg-light rounded card-body border-dark'>
                <p className='card-text'>{trip.name}</p>
               </div> 
            </div>
        )
    })}
    </div>
)
}

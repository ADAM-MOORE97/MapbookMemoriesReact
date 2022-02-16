import React, {useState, useEffect} from 'react';

export default function Gallery() {
    useEffect(()=>{
        fetch('/trips')
        .then(res=>{
            if(res.ok){
                res.json().then(data=>{
                    console.log(data)
                })
            } else{
                res.json().then(data=>{
                    console.log(data.errors.toString())
                })
            }
        })
    },[])
  return (
  <div>
      
  </div>);
}

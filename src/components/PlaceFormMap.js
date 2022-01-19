import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const styles = {
    width: "80vw",
    height: "50vh",
    margin: 'auto',
   
    border: "5px solid",
    position: 'relative',
    
    
  };

export default function PlaceFormMap({setMapped_Address, setPlace_Type, setLatitude, setLongitude}) {

    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);
    const [lng, setLng] = useState(-98.100000);
    const [lat, setLat] = useState(39.500000);
    const [zoom, setZoom] = useState(3.000);


    useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_MAP_API;
        const initializeMap = ({ setMap, mapContainer }) => {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
                center: [-98.100000, 39.500000],
                zoom: 3.000
            });
            const directions = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl,
                marker: false

            });

            map.addControl(directions, 'top-right')
            directions.on('result', (e)=>{
            
               console.log(e)
                    setMapped_Address(e.result.place_name)
                    setPlace_Type(e.result.place_type[0])
                    setLatitude(e.result.geometry.coordinates[0])
                    setLongitude(e.result.geometry.coordinates[1])
            
                
            })
            map.on("load", () => {
                setMap(map);
                map.resize();
            });
        
            map.on('move', () => {
                setLng(map.getCenter().lng.toFixed(6));
                setLat(map.getCenter().lat.toFixed(6));
                setZoom(map.getZoom().toFixed(3));
            });
      

        };

        if (!map) initializeMap({ setMap, mapContainer });
    }, [map]);



    return (
        <div className="row">
        <div className="sidebar text center col-xs-3">
            Center Of Map: Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div ref={el => (mapContainer.current = el)} style={styles} />
        
    

    </div>
    )
}

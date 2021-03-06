import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const styles = {
    width: "90vw",
    height: "50vh",
  margin: 'auto',
    padding: '5em',
    border: "5px solid"
  
  };

export default function PlaceFormMap({setMapped_Address, setPlace_Type, setLatitude, setLongitude}) {

    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);
    const [lng, setLng] = useState(-98.100000);
    const [lat, setLat] = useState(39.500000);
    const [zoom, setZoom] = useState(3.000);


// Render interactive map to search for Locations through MapBox API and render information to Location Form.
    useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_MAP_API;
        const initializeMap = ({ setMap, mapContainer }) => {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/light-v10', // stylesheet location
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
            
            
                    setMapped_Address(e.result.place_name)
                    setPlace_Type(e.result.place_type[0])
                    setLatitude(e.result.geometry.coordinates[1])
                    setLongitude(e.result.geometry.coordinates[0])
            
                
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
        <div className="row m-1">
            
        <div ref={el => (mapContainer.current = el)} style={styles} />
        
            <p className="mapCenter mt-2 bg-dark text-light">Center: Latitude: {lat} | Longitude: {lng} | Zoom: {zoom}</p>
        
       

    </div>
    )
}

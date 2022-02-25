import React, { useEffect, useRef, useState, useContext } from "react";
import { UserContext } from '../context/user';
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

const DashMap = ({latitude = 39.500000, longitude = -98.100000, magnify = 2.000 }) => {
    const { user, setUser } = useContext(UserContext);
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);
    const [lng, setLng] = useState(longitude);
    const [lat, setLat] = useState(latitude);
    const [zoom, setZoom] = useState(magnify);


    useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_MAP_API;
        const initializeMap = ({ setMap, mapContainer }) => {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style:  "mapbox://styles/mapbox/light-v10", // stylesheet location
                center: [longitude, latitude],
                zoom: magnify
            });
            const directions = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl,
                marker: false

            });

            map.addControl(directions, 'top-right')
            directions.on('result', (e)=>{
                console.log(e.result)
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
        if(user.locations.length > 0 && map){
            user.locations.map((location)=>{
                let style= location.visited? 'green' : 'red'
                let lng = Number(location.longitude)
                let lat = Number(location.latitude)
                let marker = new mapboxgl.Marker({color: style, anchor: 'bottom'}).setLngLat([lng, lat]).addTo(map)
                marker.getElement().id = location.id
                // console.log(marker.getElement())
                const popup = marker.setPopup(new mapboxgl.Popup().setHTML(`<a className='popup-text'  href='/locations/${location.id}'>${location.custom_name}</a><p>Coordinates: (${location.latitude},${location.longitude})</p>`))
                
            })
        }

        if (!map) initializeMap({ setMap, mapContainer });
    }, [map]);



    return (
        <div className="row m-1">
            
            <div ref={el => (mapContainer.current = el)} style={styles} />
            
                <p className="mapCenter mt-2 bg-dark text-light">Center: Latitude: {lat} | Longitude: {lng} | Zoom: {zoom}</p>
            
        

        </div>
    );
};

export default DashMap;
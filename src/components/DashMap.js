import React, { useEffect, useRef, useState, useContext } from "react";
import { UserContext } from '../context/user';
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const styles = {
    width: "90vw",
    height: "50vh",
    // margin: '10em',
    padding: '5em',
    border: "5px solid"
  
  };

const DashMap = () => {
    const { user, setUser } = useContext(UserContext);
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

        if (!map) initializeMap({ setMap, mapContainer });
    }, [map]);

    if(user.locations.length > 0 && map){
        user.locations.map((location, i)=>{
            let style= location.visited? 'green' : 'red'
            let lng = Number(location.longitude)
            let lat = Number(location.latitude)
            let marker = new mapboxgl.Marker({color: style, anchor: 'bottom'}).setLngLat([lng, lat]).addTo(map)
            marker.getElement().id = location.id
            console.log(marker.getElement())
     
        })
    }

    return (
        <div className="row">
            <div className="sidebar text center col-xs-3">
                Center Of Map: Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={el => (mapContainer.current = el)} style={styles} />
       
        

        </div>
    );
};

export default DashMap;
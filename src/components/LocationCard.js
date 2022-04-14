
import { useNavigate } from "react-router-dom";



export default function LocationCard({ location }) {
    const navigate = useNavigate();
    // Render animated svg for status of 'visited' 
    let visitAnimation = <svg className={location.visited ? "checkmark" : "xmark"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
        <circle className={location.visited ? "checkmark__circle" : "xmark"} cx="26" cy="26" r="25" fill="none" />
        <path className={location.visited ? "checkmark__check" : "xmark"} fill="none" d={location.visited ? "M14.1 27.2l7.1 7.2 16.7-16.8" : "M16 16 36 36 M36 16 16 36"} />
    </svg>


    return (
    // Render card for each Location in user's collection.
        <div className='col d-flex mx-auto'>
            <div className='card flex-fill border-dark'>
                <div className='card-body'>
                    <h5 className='card-title'>{location.custom_name}</h5>
              
                    <h6 className='card-subtitle mb-2 text-muted'>{location.mapped_address}</h6>
             
                    <div className='card-text'>Visited: {visitAnimation}</div>

                </div>
                <div className='card-footer border-top border-dark bg-secondary'>

                    <button className='btn btn-dark' onClick={() => { navigate(`/locations/${location.id}`) }}>Full Details</button>
                </div>

            </div>

        </div>
    )
}

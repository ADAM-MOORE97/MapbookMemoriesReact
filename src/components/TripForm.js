import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/user';


export default function TripForm({ setTripData }) {
    // current user
    const { user, setUser } = useContext(UserContext);

    // params & navigation
    const params = useParams();
    const navigate = useNavigate();

    // FormData state
    const [name, setName] = useState('')
    const [start_date, setStart_Date] = useState('')
    const [end_date, setEnd_Date] = useState('')
    const [description, setDescription] = useState('')
    const [taken, setTaken] = useState(false)
    const [locationId, setLocationId] = useState('')
    const [attachments, setAttachments] = useState({ attachments: [] })

    const [locationOptions, setLocationOptions] = useState([])
    // error handling
    const [error, setError] = useState(false)
    const [submitErrors, setSubmitErrors] = useState(false)
    const [help, setHelp] = useState(false)
    const [authError, setAuthError] = useState(false)
    // Condition fetch with params
    const URL = 'https://mapbook-memories-backend.herokuapp.com'
    useEffect(() => {
        if (params.id) {
            fetch(`${URL}/trips/${params.id}`,{
                headers: { "Content-Type": "application/json" },
                credentials: 'include'
            })
                .then(res => {
                    if (res.ok) {
                        res.json().then(data => {
                            console.log(data)
                            setName(data.name)
                            setStart_Date(data.start_date)
                            setEnd_Date(data.end_date)
                            setDescription(data.description)
                            setTaken(data.taken)
                            setLocationId(data.location_id)
                            setAttachments({
                                attachments: data.attachment_urls
                            })

                            fetch(`${URL}/locations/${data.location_id}`,{
                                headers: { "Content-Type": "application/json" },
                                credentials: 'include'
                            })
                                .then(r => r.json())
                                .then(data => {
                                    console.log(data)
                                    setLocationOptions([data])



                                })
                        })
                    } else if (res.status === 401) {
                        res.json().then(data => setAuthError(data.errors)).then(setTimeout(() => { setUser(!user) }, 5000))

                    } else {
                        res.json().then(data => {
                            setError(data.errors.toString().substring(0, 18))
                        })
                        setTimeout(() => {
                            setError('')
                            navigate('/')
                        }, 5000)
                    }
                })
        } else {
            fetch(`${URL}/locations`,{
                headers: { "Content-Type": "application/json" },
                credentials: 'include'
            })
                .then(res => {
                    if (res.ok) {
                        res.json().then(data => {
                            setLocationOptions(data)
                        })
                    } else {
                       
                        res.json().then(data => setAuthError(data.errors)).then(setTimeout(() => { setUser(!user) }, 5000))
                            

                    }
                })
        }
    }, [])
    const imageUpload = (e) => {
        setAttachments({
            attachments: [...e.target.files]
        })
    }

    const submitForm = (e) => {
        e.preventDefault();
        const form = e.target
        const formData = new FormData();

        formData.append("name", name)
        formData.append("user_id", user.id)
        formData.append('location_id', locationId)
        formData.append("start_date", start_date)
        formData.append("end_date", end_date)
        formData.append('description', description)
        formData.append("taken", taken)
        if (taken) for (let i = 0; i < form.attachments.files.length; i++) {
            formData.append("attachments[]", form.attachments.files[i])
        }
        fetch(params.id ? `${URL}/trips/${params.id}` : `${URL}/trips`, {
            method: params.id ? 'PATCH' : 'POST',
            credentials: 'include',
            body: formData
        }).then(res => {
            if (res.ok) {
                res.json().then(data => {
                    setTripData(data)
                    navigate(`/trips/${data.id}`)
                })
            } else if (res.status === 422) {

                res.json().then(data => {

                    let name = data.errors.filter(error => error.includes('Name'))
                    let start = data.errors.filter(error => error.includes('Start'))
                    let end = data.errors.filter(error => error.includes('End'))
                    let description = data.errors.filter(error => error.includes('Description'))
                    let location = data.errors.filter(error => error.includes('Location'))

                    setSubmitErrors({
                        name: name,
                        start: start,
                        end: end,
                        description: description,
                        location: location,

                    })
                    console.log(authError)
                    setTimeout(() => setSubmitErrors(false), 10000)
                })

            } else {
                res.json().then(data => setAuthError(data.errors)).then(setTimeout(() => { setUser(!user) }, 5000))
            }
        })
    }


    const helpMessage = () => {
        setHelp(true)
        setTimeout(() => setHelp(false), 7000)
    }



    if (error) {
        return (
            <div>
                <h3 className="alert-danger m-1">Status: 404, {error} within your saved data, navigating back to your Dashboard...</h3>
            </div>
        )
    }
    return (
        <div className='container-fluid mt-5'>
            <div className='row'>
                {authError ? authError.map(error => <p className="alert-danger m-1">*{error}. Session expired, routing back to Login Page...</p>) : null}
                <form className='col-8 text-center border' onSubmit={submitForm}>
                    {locationOptions.length > 0 ? null : <i role='button' className="bi bi-info-circle m-1" onClick={helpMessage}></i>}
                    <label className='form-label mt-3'>Place:</label>
                    <select name='place' className='form-control border-dark' required onChange={(e) => {
                        setLocationId(e.target.value)
                        console.log(e.target.value)
                    }}>

                        <option> -- Select a Place -- </option>
                        {locationOptions.map((place) => <option key={place.id} value={place.id}>{place.custom_name}</option>)}

                    </select>
                    {help ? <p className='alert-dark m-1'>It appears that you have no locations added at this time. Click <em className='bg-danger' role='button' onClick={() => navigate(`/locations/new`)}>here</em> to add one!</p> : null}
                    {submitErrors ? submitErrors.location.map(error => <p className="alert-danger m-1">*{error}.</p>) : null}
                    <label className='form-label mt-3'>Name:</label>
                    <input className='form-control border-dark' name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Trip Name'></input>
                    {submitErrors ? submitErrors.name.map(error => <p className="alert-danger m-1">*{error}.</p>) : null}

                    <label className='form-label mt-3'>Start Date:</label>
                    <input className='form-control border-dark' type='date' value={start_date} name='start_date' onChange={(e) => setStart_Date(e.target.value)}></input>
                    {submitErrors ? submitErrors.start.map(error => <p className="alert-danger m-1">*{error}.</p>) : null}

                    <label className='form-label mt-3'>End Date:</label>
                    <input className='form-control border-dark' type='date' value={end_date} name='end_date' onChange={(e) => setEnd_Date(e.target.value)}></input>
                    {submitErrors ? submitErrors.end.map(error => <p className="alert-danger m-1">*{error}.</p>) : null}

                    <label className='form-label mt-3'>Trip Description:</label>
                    <textarea className='form-control border-dark' name='description' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    {submitErrors ? submitErrors.description.map(error => <p className="alert-danger m-1">*{error}.</p>) : null}

                    <label className='form-label mt-3'>Check if Trip Taken:  </label>
                    <input type='checkbox' name='taken' checked={taken} onChange={(e) => setTaken(e.target.checked)}></input>
                    <br></br>
                    {taken ? <div><label className='form-label mt-3'>Trip Images:</label>
                        <input className='form-control border-dark' name='attachments' type='file' accept='image/*' multiple={true} onChange={imageUpload}></input>
                    </div> : null}
                    <button className='btn btn-dark mt-3' type='submit'>Submit</button>
                </form>

            </div>

        </div>

    )
}

import React, {useState} from 'react'
import Signup from './Signup'
import Login from './Login'



export default function LandingPage() {
    // conditionally render Login or Signup component given status of user account.
    const [needAccount, setNeedAccount] = useState(false)
    return (
    // Login or Signup
        <div style={{margin: 'auto', 'maxWidth': '800px', 'textAlign': 'center'}}>
             <h1 className='border-bottom border-dark' style={{textAlign: 'center'}}>MapBook Memories {needAccount ? 'Signup' : 'Login'}</h1>
             {needAccount?<Signup/> :<Login />}
             <div style={{textAlign: 'center'}} className='mt-5'>
                <button className='btn btn-secondary' onClick={()=>setNeedAccount(!needAccount)}>{needAccount ? 'Have an account?' : 'Need an account?'}</button>    
            </div>
        </div>
    )
}

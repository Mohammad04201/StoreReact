import Register from "components/register-form/register-form"
import Login from "components/login-form/login-form"
import { useEffect, useState } from "react"
import { MainContext } from "utils/context"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
export default function Authenticate(){
   const[registerMode,setRegisterMode]=useState(false)
   const {user,loading}=useContext(MainContext) 
   const navigate=useNavigate()
   
   useEffect(()=>{

!loading&&user&&navigate('/')

   },[loading,user])

   return (registerMode?
    <div className="authenticate">
       <Register/>
            <p className="p">Already have an account?<span 
            onClick={() => setRegisterMode(false)}
            className="span">Login</span> </p>
    
    </div>    
    :
<div className="authenticate">
      <Login/>
      <p className="p">Don't have an account? <span
       onClick={() => setRegisterMode(true)}
      className="span">Register</span> 
          </p>
       
    </div>
       
    )
}

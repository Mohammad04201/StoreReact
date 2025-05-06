import React from "react";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFrontendErrorMessage, signInUser } from "utils/firebaseFunctions";
export default function Login() {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate()
const [error,setError]=useState(null)


const handleLogin=async (e)=>{
      e.preventDefault()
const res =await signInUser(email,password)
if(res.success){
  navigate("/")
}
else{
  setError(getFrontendErrorMessage(res.error))
}
    }

  return (
    <div className="register_continer"  >
    <form className="form" onSubmit={handleLogin}>
        <p className="form-title"> Log in to your account</p>
    
      <div className="form-label">
        <label>Email </label>
      </div>
      <div className="inputForm">
        <AiOutlineMail size={24} />
        <input
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
          type="email"
          className="input"
          placeholder="Enter your Email"
          name="email"
          required
        />
      </div>
      <div className="form-label">
        <label>Password </label>
      </div>
      <div className="inputForm">
        <AiOutlineLock size={24} />
        <input
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
          type="password"
          className="input"
          placeholder="Enter your Password"
          name="password"
          required

        />
      </div>
{error&&<div className="form-error">{error}</div>}

      <button className="btn google primary" type="submit">Login</button>
 
    </form>
    

    </div>
  );
};



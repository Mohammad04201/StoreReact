import React, { useState } from "react";
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import {  useNavigate } from "react-router-dom";
import { getFrontendErrorMessage, registerUser } from "utils/firebaseFunctions";
export default function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

const [error,setErorr]=useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
const res=await registerUser(inputs.username,inputs.email,inputs.password)
if(res.success){
  navigate("/")
}
else{
setErorr(getFrontendErrorMessage(res.error))

}
  };

  return (
    <div className="register_continer">
      <form className="form" onSubmit={handleRegister}>
        <p className="form-title">Create an Account</p>
        <div className="form-label">
          <label>Name</label>
        </div>
        <div className="inputForm">
          <AiOutlineUser size={24} />
          <input
            onChange={handleInputChange}
            value={inputs.username}
            type="text"
            className="input"
            placeholder="Enter your Name"
            name="username"
          />
        </div>
        <div className="form-label">
          <label>Email</label>
        </div>
        <div className="inputForm">
          <AiOutlineMail size={24} />
          <input
            onChange={handleInputChange}
            value={inputs.email}
            type="email"
            className="input"
            placeholder="Enter your Email"
            name="email"
          />
        </div>
        <div className="form-label">
          <label>Password</label>
        </div>
        <div className="inputForm">
          <AiOutlineLock size={24} />
          <input
            onChange={handleInputChange}
            value={inputs.password}
            type="password"
            className="input"
            placeholder="Enter your Password"
            name="password"
          />
        </div>
       {error&& <div className="form-error">{error}</div>}
        <button className="btn google primary" type="submit">Register</button>
     
      </form>
    </div>
  );
}

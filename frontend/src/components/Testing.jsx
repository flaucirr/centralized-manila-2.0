import axios from 'axios';
import React from 'react'
import {useState} from "react"
import { useNavigate } from 'react-router-dom';

const Testing =()=>{
    const [testPost, setTestPost] = useState({
        f_name:"",
        l_name:"",
        mobile_no:"",
    });

const navigate= useNavigate()

const handleChange=(e)=>{
    setTestPost((prev)=>({...prev, [e.target.name]: e.target.value}))
    };

const handleClick= async e=>{
    e.preventDefault()
    try{
        await axios.post("http://localhost:8800/testing", testPost)
        console.log("Successful testing")
        navigate("/dashboard")
    }catch(err){
        console.log(err)
    }
}


    console.log(testPost)
    return(
      <>
            <div className= 'form'>
                <h1> Post Test </h1>
                
                    <input type="text" placeholder="First Name" onChange={handleChange} name="f_name" />
                    <input type="text" placeholder="Last Name" onChange={handleChange} name="l_name" />
                    <input type="text" placeholder="Mobile Number" onChange={handleChange} name="mobile_no" />
              
                           
        <button onClick={handleClick}>Post Test</button>
        </div>
        </>
       
)
}

export default Testing
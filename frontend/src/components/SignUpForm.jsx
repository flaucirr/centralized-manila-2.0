import axios from 'axios';
import React from 'react'
import {useState} from "react"
import { useNavigate } from 'react-router-dom';

const SignUpForm =()=>{
    const [userReg, setUserReg] = useState({
        f_name:"",
        l_name:"",
        mobile_no:"",
        user_pass:"",
    });

const navigate = useNavigate()

const handleChange=(e)=>{
    setUserReg((prev)=>({...prev, [e.target.name]: e.target.value}))
    };

const handleClick= async e=>{
    e.preventDefault()
    try{
        await axios.post("http://localhost:8800/register", userReg)
        console.log('Successful Register')
        navigate("/dashboard")
    }catch(err){
        console.log(err)
    }
}

console.log(userReg)
  return (
    <div className='bg-white'>
      <div className='flex justify-center'>
        <div className='flex flex-col items-center'>
          <img src='./src/images/mnl.svg' width="100" height="100" className='mt-10' />
          <h1 className='font-normal mb-16'>Centralized Manila</h1>
        </div>
      </div>

                
            <div className=' form px-6 sm:px-6 md:px-12 lg:px-64'>
            <div className="grid md:grid-cols-2 md:gap-6 sm:grid-cols-1">
                    <div className=" relative z-0 w-full mb-6 group">
                    <input onChange={handleChange} type="text" name="f_name" id="f_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="f_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First Name</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleChange} type="text" name="l_name" id="l_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="l_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last Name</label>
                    </div>
                </div>

                <div className="relative z-0 w-full mb-6 group ">
                    <input onChange={handleChange} type="text" name="mobile_no" id="mobile_no" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="mobile_no" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mobile Number (+63)</label>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                    <input onChange={handleChange} type="password" name="user_pass" id="user_pass" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="user_pass" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>

                {/* <div class="relative z-0 w-full mb-6 group">
                    <input type="password" name="user_pass1" id="user_pass1" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="user_pass1" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label>
                </div> */}

                <div>
                  <h1 className='italic text-xs'>- Minimum of 8 Characters</h1>
                  <h1 className='italic text-xs'>- At Least one uppercase and lowercase letter</h1>
                  <h1 className='italic text-xs'>- At least one symbol</h1>
                  <h1 className='italic text-xs'>- At least one number</h1>
                </div>
                
                <div className="flex flex-col items-center">
                  <button onClick={handleClick} type="submit" className="text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-normal rounded-full text-sm px-10 py-2.5 text-center mb-5 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Register</button>
                </div>
            </div>

            <div className="mt-4 font-semibold text-sm text-slate-500 text-center">
                Already have an account? <a className="text-red-600 hover:underline hover:underline-offset-4" href="../">Login Here</a>
            </div>
    </div>
  );
}

export default SignUpForm;
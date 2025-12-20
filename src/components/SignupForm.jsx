import  { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase} from '../lib/supabaseClient';

const SignupForm = () => {

    const [signup, setSignup] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;

        setSignup(prev => ({...prev, [name]: value}))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
       console.log(signup)

       setSignup({
         username: "",
         email: "",
         password: "",
       });

    }
  return (
    <>
    <form className='flex flex-col md:w-1/2 items-center m-auto mt-50 rounded-2xl shadow-2xl p-2 gap-2' onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          value={signup.username}
          placeholder="enter a username..."
          onChange={handleChange}
        />
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          name="email"
          value={signup.email}
          placeholder="enter email..."
          onChange={handleChange}
        />
        <label htmlFor="password">Password: </label>
        <input
          type="text"
          name="password"
          value={signup.password}
          placeholder="enter password..."
          onChange={handleChange}
        />
        <button type='submit' className='btn btn-primary '>Signup</button>
    </form>
    </>
  )
}

export default SignupForm
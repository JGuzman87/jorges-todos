import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from 'react-router-dom';

import { useState } from "react";

const LoginForm = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

    const handleChange = (e) => {
      const { name, value } = e.target;

      setUser((prev) => ({ ...prev, [name]: value }));
    };


  const handleSubmit = async (e) => {
    e.preventDefault();

  const { error } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: user.password,
  });

    if (error) {
      throw new Error("Error adding user");
    } else {
     navigate('/dashboard')
   
      setUser({ email: "", password: "" });
    }
  };





  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 md:w-1/2 items-center mt-50 self-center shadow-2xl p-2 rounded-lg"
      >
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          name="email"
          value={user.email}
          placeholder="enter email..."
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password: </label>
        <input
          type="text"
          name="password"
          value={user.password}
          placeholder="enter password..."
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-success">
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;

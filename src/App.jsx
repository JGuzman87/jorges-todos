import { Route, Routes, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "./lib/supabaseClient";
import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";

function App() {
  const queryClient = useQueryClient();

const [session, setSession] = useState(null);

const getSession = async () => {
   const currentSession = await supabase.auth.getSession();

}

useEffect(() => {
 getSession();

 const {data: authListener} = supabase.auth.onAuthStateChange(
  (_event, session ) => {
    setSession(session);
  }
 );

 return () => {
  authListener.subscription.unsubscribe();
 }
 
},[])



  // const { data  }  = useQuery({
  //   queryKey: ['list'],
  //   queryFn: fetchSession,
  // })

  return (
    <div className="flex flex-col ">
      {session && <p>HI</p>}
      <Nav session={session} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;

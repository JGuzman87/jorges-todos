import { Route, Routes, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "./lib/supabaseClient";
import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";

function App() {
  const [session, setSession] = useState(null);


  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="flex flex-col ">
      <Nav session={session} />
      <Routes>
        <Route path="/" element={<Home session={session} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;

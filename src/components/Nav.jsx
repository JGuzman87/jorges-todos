import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const Nav = ({session}) => {

 const navigate = useNavigate();
  const signOut = async () => {
    await supabase.auth.signOut();
 
    navigate('/')
  }

  useEffect(() => {
    if (!session) {
      return;
    } else {
      console.log(session.data)
    }
 
  }, [])

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl" to="/">
            G-ToDo
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>{session && <Link to="/dashboard">Dashboard</Link>}</li>
            <li>{!session && <Link to="/signup">Signup</Link>}</li>{" "}
            <li>
              {session ? (
                <motion.button
                  type="button"
                  className="btn btn-ghost"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={signOut}
                >
                  Logout
                </motion.button>
              ) : (
                <motion.button
                  type="button"
                  className="btn btn-ghost"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => navigate("/")}
                >
                  Login
                </motion.button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Nav
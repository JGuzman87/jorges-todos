import { Link } from 'react-router-dom'
const Nav = () => {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl" to="/">daisyUI</Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
          
            <li>
                <Link to="/dashboard">Dashboard</Link>
            </li>

          </ul>
        </div>
      </div>
    </>
  );
}

export default Nav
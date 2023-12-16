import { Link } from 'react-router-dom'
async function logout() {
const res = await fetch("/registration/logout/", {
  credentials: "same-origin", // include cookies!
});

if (res.ok) {
  // navigate away from the single page app!
  window.location = "/registration/sign_in/";
} else {
  // handle logout failed!
}
}

export function Navbox() {
      return (
      <div className="nav">
          <Link to={''} className="home-button">Home</Link><Link to={`/newtopic/`} className="menu-button">New Topic</Link><a onClick={logout} className="menu-button">Logout</a>
      </div>
  )
  }

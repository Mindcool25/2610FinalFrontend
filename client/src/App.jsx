import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import cookie from "cookie"
import { Link } from 'react-router-dom'



function App() {
  const [count, setCount] = useState(0)

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

  async function makePost() {
    const data = {
      title: "penis",
      content: "penis man",
      parent: 1
    }
    const options = {
      method:"POST",
      body: JSON.stringify(data),
      credentials: "same-origin",
      headers: {
        "X-CSRFToken": cookie.parse(document.cookie).csrftoken
      }
    }
    fetch ("newpost", options)
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button onClick={logout}>Logout</button> <button onClick={makePost}>post</button> <Link to={'/post/1'}>post</Link>
    </>
  )
}

export default App;

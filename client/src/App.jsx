import { useState, useEffect } from 'react'
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



  const [topics, setTopics] = useState([])

  async function getTopics() {
      const res = await fetch(`/gettopics`, {
        credentials: "same-origin", // include cookies!
      });
      console.log("AM HERE");

      if (res.ok) {
        return await res.json();
      } else {
        // handle logout failed!
      }
    }
  useEffect ( () => {
      const getPosts = async () => {
          const newTopics = await getTopics();
          console.log(newTopics)
          setTopics([...newTopics.topics]);
      }
      getPosts();
  }, []);

  const r = topics.map((topic) =>
  <Link to={`/topic/${topic.id}`}key={topic.id}>
    <h2>{topic.title}</h2>
    <p>{topic.description}</p>
  </Link>
  );
  return(
      <div>
          <Link to={`/newtopic/`}>New Topic</Link><button onClick={logout}>Logout</button>

          {r}
      </div>
  )
}

export default App;

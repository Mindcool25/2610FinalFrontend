import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import cookie from "cookie"
import { Link } from 'react-router-dom'
import { Navbox } from './nav'



function App() {
  const [count, setCount] = useState(0)
  const [topics, setTopics] = useState([])

  async function getTopics() {
      const res = await fetch(`/gettopics`, {
        credentials: "same-origin", // include cookies!
      });

      if (res.ok) {
        return await res.json();
      } else {
        // handle logout failed!
      }
    }
  useEffect ( () => {
      const getPosts = async () => {
          const newTopics = await getTopics();
          setTopics([...newTopics.topics]);
      }
      getPosts();
  }, []);

  const r = topics.map((topic) =>
      <div className="topic-link">
  <Link to={`/topic/${topic.id}`}key={topic.id}>
    <h2>{topic.title}</h2>
    <p>{topic.description}</p>
  </Link>
      </div>
  );
  return(
      <div>
          <Navbox/>
      <div className="content">
        {r}
      </div>
      </div>
  )
}

export default App;

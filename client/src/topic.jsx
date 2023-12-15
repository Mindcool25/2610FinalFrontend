import { useEffect, useState } from "react";
import { Data } from "./post";
import { Link } from 'react-router-dom'


export function Topic(props) {
    const [topic, setTopic] = useState([])

    async function getTopic(id) {
        const res = await fetch(`/gettopic/1`, {
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
            const newPosts = await getTopic(props.id);
            setTopic([...topic, ...newPosts.posts]);
        }
        getPosts();
    }, []);

    const r = topic.map((post) =>
    <Link to={`/post/${post.id}`}>
      <Data post={post} key={post.id}/>
    </Link>
    );
    return(
        <div>
            {r}
        </div>
    )
}

import { useEffect, useState } from "react";
import { Data } from "./post";
import { Link, useParams } from 'react-router-dom'
import { Navbox } from './nav'


export function Topic(props) {
    const [topic, setTopic] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const { id } = useParams()

    async function getTopic(funcid) {
        const res = await fetch(`/gettopic/${funcid}`, {
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
            const newPosts = await getTopic(id);
            setTopic([...topic, ...newPosts.posts]);
            setTitle(newPosts.title);
            setDescription(newPosts.description)
        }
        getPosts();
    }, []);

    const r = topic.map((post) =>
        <div className="post-link">
    <Link  to={`/post/${post.id}`}key={post.id}>
      <Data post={post}/>
    </Link>
        </div>
    );
    return(
        <div>
            <Navbox/>
            <h1>{title}</h1>
            <p>{description}</p>
            <Link className="new-post" to={`/newparent/${id}`}>New Post</Link>

            {r}
        </div>
    )
}

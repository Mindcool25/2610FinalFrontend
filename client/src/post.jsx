import { useEffect, useState } from 'react'

export function Data(props){
    return (
        <div className="post">
            <h2 className="postTitle">{props.post["title"]}</h2>
            <h3 className="postUser">{props.post["user"]}</h3>
            <p className="postContent">{props.post["content"]}</p>
        </div>
    )
}

export function WholePost(props){
    const [posts, setPosts] = useState([])

    async function getPost(id) {
        const res = await fetch(`/getpost/${id}`, {
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
            const newPosts = await getPost(props.id);
            setPosts([...posts, ...newPosts.posts]);
        }
        getPosts();
    }, []);

    
    
    const r = posts.map((post) =>
    <Data post={post} key={post.id}/>
    );
    return(
        <div>
            {r}
        </div>
    )

}

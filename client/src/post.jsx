import { useEffect, useState } from 'react'

export function WholePost(props){
    const [posts, setPosts] = useState([])

    async function getPost(id) {
        const res = await fetch("/getpost/1", {
          credentials: "same-origin", // include cookies!
        });

        await console.log(await res)
    
        if (res.ok) {
          const body = await res.json
          return body.json();
        } else {
          // handle logout failed!
        }
      }
    useEffect ( () => {
        const newPosts = getPost(props.id)
        setPosts([...posts, ...newPosts]);
    }, []);

    function Data(props){
        return (
            <div className="post">
                <h2 className="postTitle">{props.post["title"]}</h2>
                <h3 className="postUser">{props.post["user"]}</h3>
                <p className="postContent">{props.post["content"]}</p>
            </div>
        )
    }
    
    const r = posts.map((post) =>
    <Data post={post} key={post[id]}/>
    );
    return(
        <div>
            {r}
        </div>
    )

}
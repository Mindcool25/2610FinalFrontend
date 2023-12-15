import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import cookie from "cookie"

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
    const [last, setLast] = useState({})
    const [save, setSave] = useState(false)
    const { id } = useParams()

    async function getPost(funcid) {
        const res = await fetch(`/getpost/${funcid}`, {
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
            const newPosts = await getPost(id);
            setPosts([...newPosts.posts]);
            setLast(newPosts[newPosts.length-1])
        }
        getPosts();
    }, [save]);

    function NewChild(props) {
        const [title, newTitle] = useState("")
        const [content, newContent] = useState("")
    
        async function makePost(event) {
            event.preventDefault()
            const data = {
                title: title,
                content: content,
                topic: posts[posts.length-1].topic,
                parent: posts[posts.length-1].id
            }
            const options = {
              method:"POST",
              body: JSON.stringify(data),
              credentials: "same-origin",
              headers: {
                "X-CSRFToken": cookie.parse(document.cookie).csrftoken
              }
            }
            console.log(data)
            await fetch("/newpost", options)
            newTitle("")
            newContent("")
            if (save){
                setSave(false)
            }
            else{
                setSave(true)
            }
            
            
            
            
        }
    
        return(
            <form>
                <div>
                    <label>Title: <input
                        type='text' 
                        value={title}
                        onChange={(e) => newTitle(e.target.value)}
                    />
                    </label>
                </div>
                <div>
                    <label>Content: <textarea
                        value={content}
                        onChange={(e) => newContent(e.target.value)}
                    />
                    </label>
                </div>
                <div>
                    <button onClick={makePost}>Save</button>
                </div>
            </form>
        )
    
    }
    
    const r = posts.map((post) =>
    <Data post={post} key={post.id}/>
    );

    

    return(
        <div>
            {r}
            <h2>New Post</h2>
            <NewChild/>
        </div>
    )

}

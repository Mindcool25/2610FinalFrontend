import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import cookie from "cookie"

export function Data(props){
    const im_loop = () => {
        for (let i =0; i<props.post["images"]; i++) {
            console.log("FUCK");
        }
    }
    return (
        <div className="post">
            <h2 className="postTitle">{props.post["title"]}</h2>
            <h3 className="postUser">{props.post["user"]}</h3>
            <p className="postContent">{props.post["content"]}</p>
            {props.post["images"].map((image, i) => (
                <img key={i} className="image" src={"http://localhost:8080" + image.path} height="200" ></img>
            ))}
            {im_loop()}
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

        if (res.ok) {
          return await res.json();
        } else {
          // handle logout failed!
        }
      }
    useEffect ( () => {
        const getPosts = async () => {
            const newPosts = await getPost(id);
            await setPosts([...newPosts.posts]);
            setLast(newPosts[newPosts.length-1])
        }
        getPosts();
    }, [save]);

    function NewChild(props) {
        const [title, newTitle] = useState("")
        const [content, newContent] = useState("")
        const [file, setFile] = useState()

        function handleChange(e) {
            const f = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                setFile(reader.result);
                console.log(file);
            }
            if (f){
                reader.readAsDataURL(f)
            }
        }
    
        async function makePost(event) {
            event.preventDefault()
            let data = {
                title: title,
                content: content,
                topic: posts[posts.length-1].topic,
                parent: posts[posts.length-1].id,
            }
            console.log(file);
            if (file != undefined){
                data.has_image = "true";
                data.image = file
            }
            const options = {
              method:"POST",
              body: JSON.stringify(data),
              credentials: "same-origin",
              headers: {
                "X-CSRFToken": cookie.parse(document.cookie).csrftoken,
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
                    <label>image(max: 4.5M): <input type="file" id="avatar" name="image" accept="image/png, image/jpeg" onChange={handleChange}/></label>
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

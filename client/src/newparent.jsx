import { useEffect, useState } from 'react'
import { Link, useParams, redirect } from 'react-router-dom'
import cookie from "cookie"

export function NewParent(props) {
    const {id} = useParams()
    const [title, newTitle] = useState("")
    const [content, newContent] = useState("")

    async function makePost(event) {
        event.preventDefault()
        const data = {
            title: title,
            content: content,
            topic: id,
        }
        const options = {
          method:"POST",
          body: JSON.stringify(data),
          credentials: "same-origin",
          headers: {
            "X-CSRFToken": cookie.parse(document.cookie).csrftoken
          }
        }
        
        const e = await fetch ("/newpost", options)
        return(redirect(`/post/${e.id}`))
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

import { useState } from 'react'
import { useParams, redirect } from 'react-router-dom'
import cookie from "cookie"

export function NewTopic(props) {
    const {id} = useParams()
    const [title, newTitle] = useState("")
    const [description, newDescription] = useState("")

    async function makePost(event) {
        event.preventDefault()
        const data = {
            title: title,
            description: description,
        }
        const options = {
          method:"POST",
          body: JSON.stringify(data),
          credentials: "same-origin",
          headers: {
            "X-CSRFToken": cookie.parse(document.cookie).csrftoken
          }
        }
        console.log("topic made!")
        await fetch("/newtopic", options)
        history.back()
        
        
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
                <label>description: <textarea
                    value={description}
                    onChange={(e) => newDescription(e.target.value)}
                />
                </label>
            </div>
            <div>
                <button onClick={makePost}>Save</button>
            </div>
        </form>
    )

}

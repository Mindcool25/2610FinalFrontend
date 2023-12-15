import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export function NewParent(props) {
    const {id} = useParams()
    const [title, newTitle] = useState("")
    const [content, newContent] = useState("")

    async function makePost() {
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
        fetch ("/newpost", options)
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
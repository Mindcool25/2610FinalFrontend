import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { WholePost } from './post.jsx'
import { Topic } from './topic.jsx'
import { NewParent } from './newparent.jsx'
import './index.css'
import 'vite/modulepreload-polyfill'

import {createBrowserRouter, RouterProvider} from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/post/:id",
    element: <WholePost/>
  },
  {
    path: "/topic/:id",
    element: <Topic/>
  },
  {
    path: "/newparent/:id",
    element:<NewParent/>
  }

]);


ReactDOM.createRoot(document.getElementById('root')).render(

  <RouterProvider router={router}/>

)

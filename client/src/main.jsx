import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import WholePost from './post.jsx'
import './index.css'
import 'vite/modulepreload-polyfill'

import {createBrowserRouter, RouterProvider} from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/post/1",
    element: <WholePost/>
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(

  <RouterProvider router={router}/>

)

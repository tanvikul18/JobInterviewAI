import {Toaster} from "react-hot-toast"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import LandingPage from "./Pages/LandingPage"
import Login from "./Pages/Auth/Login"
import SignUp from "./Pages/Auth/SignUp"
import Dashboard from "./Pages/Home/Dashboard"
import Error from "./Pages/Error/Error"
import InterviewPrep from "./Pages/InterviewPrep/InterviewPrep"
function App() {
 const router = createBrowserRouter([
    {
       path : "/",
       element : <LandingPage/>,
       errorElement : <Error/>,
    },
            {
          path : "/login",
          element : <Login/>
        },
        {
          path : "/signup",
          element : <SignUp/>
        },
        {
          path : "/dashboard",
          element : <Dashboard/>,
          
        },
        {
           path : "/interview-prep/:sessionId",
           element : <InterviewPrep/>
        }
        
      ]
  )
 

  return(
    <>
    
     <RouterProvider router={router}></RouterProvider>
     <Toaster 
      toastOptions={{
        className: "", 
        style: {
          fontSize: "13px" 
        }
  }}
/>
</>
    )
}

export default App

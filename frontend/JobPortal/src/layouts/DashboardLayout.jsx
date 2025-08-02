import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/usercontext'
import Navbar from "./Navbar.jsx"
export default function DashboardLayout({children}) {
    const {user} = useContext(UserContext)
  return (
    <div>
       <Navbar/>
       {user && <div>{children}</div>}
    </div>
  )
}

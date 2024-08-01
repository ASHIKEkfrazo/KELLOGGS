import { Outlet } from "react-router-dom";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import Login from "./Auth/Login";
import Main from "../components/layout/Main";
export default function Layout() {
const [auth,setAuth] = useState(false)

const token = localStorage.getItem("token");
const PlantData = localStorage.getItem("PlantData");

useLayoutEffect(()=>{
    if(token){
        setAuth(true)
    }
    else{
        setAuth(false)
        // setAuth(true)
    }
},[])

  return (
    <>
    
  {
    auth ? <Main><Outlet/> </Main> : <Login/>
  }
   
    </>
  )
}

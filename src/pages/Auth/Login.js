import React, { useState } from 'react'
import { Card, Col, Row } from 'antd';
import axios from "axios";
import { baseURL } from '../../API/API';
import { Button, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate()
const [api, contextHolder] = notification.useNotification();

const [loginPayload ,setloginPayload] = useState( {
  email_or_phone: "",
password: ""
})

const [error,setError]=useState({
UserError : "",
PasswordError:""
})
const [userData,setuserdata] =  useState();


const openNotification = (param) => {
    const {status,message} = param
    
    api[status]({
      message:message || "",
    //   description:
    //     'I will never close automatically. This is a purposely very very long description that has many many characters and words.',
      duration: 0,
    });
  };


const loginPost = async()=>{
    try {
     if(loginPayload.email_or_phone === ""){
     setError((prev)=>({...prev,UserError:"Username/Mobile Number not entered"}))
     }

     if(loginPayload.password === ""){
        setError((prev)=>({...prev,PasswordError:"Password is empty"}))
     }

if(loginPayload.email_or_phone !== "" || loginPayload.password !== ""){

    const res = await axios.post(`${baseURL}login/`,loginPayload);

    if(res.status == 200){
      console.log(res.data)
        setuserdata(res.data)
        localStorage.setItem("token",JSON.stringify(res.data.access_token))
        localStorage.setItem("refreshToken",JSON.stringify(res.data.refresh_token))
        openNotification({status:"success",message:"Login Successful"});
        setTimeout(()=>{
          navigate("/Plant" );
         window.location.reload()

        },1500)
      }


}
   
    } catch (error) {
     
            openNotification({status:"error",message:"Invalid Credentials"})
        
       
    }
}

const handleChange = (e) =>{
const {name, value} = e.target;

if(name === "email_or_phone" ){
    setError((prev)=>({...prev,UserError:""}))
}
if(name === "password" ){
    setError((prev)=>({...prev,PasswordError:""}))
}

setloginPayload((prev)=>({...prev,[name]:value}))
}
console.log(loginPayload)
  return (
    <>
       {contextHolder}
    <div className="" style={{background:'#faf5f5',height:'100vh',width:'100%',overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center'}}>
    <Col span={6}>

      <Card  bordered={false} style={{padding:'2rem',borderRadius:'25px'}}>
    <div className="">
    <img src="https://aivolved.in/wp-content/uploads/2022/11/ai-logo.png" style={{height:'80px'}} alt="" />
    </div>
    <div className="" style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
        <h2>Login</h2>
        <input
            type="text"
            style={{
              height: "1.5rem",
              width: "100%",
              padding: "1.5rem",  
                          border: "0.5px solid grey",
              borderRadius: "5px",
              outline: "none",
              }}
            name="email_or_phone"
            placeholder="Username/Mobile Number"
            onChange={handleChange}
            helperText={error.UserError}
          />
          {
            error.UserError ? <span style={{color:'red',fontWeight:'600',fontSize:'0.8rem'}}>{error.UserError}</span>:""
          }
               <input
            type="text"
            style={{
              height: "2rem",
              width: "100%",
              padding: "1.5rem",
              border: "0.5px solid grey",
              borderRadius: "5px",
              outline: "none",
            }}
            placeholder="Password"
            name='password'
            onChange={handleChange}

          />
              {
            error.PasswordError ? <span style={{color:'red',fontWeight:'600',fontSize:'0.8rem'}}>{error.PasswordError}</span>:""
          }
    </div>
    {/* <div className="">
        <p style={{fontSize:'1rem', fontWeight:'bolder',cursor:"pointer"}} onClick={()=>navigate("/resetPassword")}>Reset Password?</p>
    </div> */}
    <div className="">
        <button style={{padding:'0.8rem 3rem',background:'#ff4403',border:'none',borderRadius:'5px',color:'#fff',fontWeight:'600'}} onClick={loginPost}>Login</button>
    </div>
      </Card>
 
    </Col>

    </div>




    </>
  )
}

export default Login
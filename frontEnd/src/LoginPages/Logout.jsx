import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Logout =()=>{
    const navigate = useNavigate();
     const handlelogout = async () => {
        try {
          const fetch = await axios.get("http://localhost:3000/auth/logout", {
            withCredentials: true,
          });
          const data = fetch.data;
          if(fetch.data.status){
            navigate("/auth/login");
          }
          setIsLogout(data.msg);
          if (data.msg) {
            navigate("/auth/login");
          }
        } catch (error) {
        console.error(error);
        }
      };
    
  return(
    <>
     <div>
        <form action=""  onSubmit={handlelogout} method="GET">
        <button>logout</button>
        </form>
      </div>
    </>
  )
}
export default Logout;
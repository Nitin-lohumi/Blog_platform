import React, { useEffect, useState } from "react";
import axois from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../AttributesPages/Header";
import CreateBlog from "./CreateBlog";
import Profile from "./Profile";
import Post from "./Post";
const Home = () => {
  const navigate = useNavigate();
  const [DataUser, setDataUser] = useState([]);

  const [NavigatePost, setNavigatePost] = useState(true);
  const [NavigatePProfile, setNavigateProfile] = useState(false);
  const [NavigateCreateBlog, setNavigateCreateBlog] = useState(false);
  const userData = async () => {
    try {
      const fetch = await axois.get("http://localhost:3000/auth/ShowUser", {
        withCredentials: true,
      });
      const res = fetch.data;
      setDataUser(res.user);
      console.log(res.user);
    } catch (error) {
      console.log(error);
      navigate("/auth/login");
    }
  };
  useEffect(() => {
    userData();
  }, []);


  const handleNavigatePost =()=>{
    setNavigatePost(true);
    setNavigateCreateBlog(false);
    setNavigateProfile(false);
  }
  const handleNavigateCreateBlog =()=>{
    setNavigatePost(false);
    setNavigateCreateBlog(true);
    setNavigateProfile(false);
  }
  const handleNavigateProfile=()=>{
    setNavigatePost(false);
    setNavigateCreateBlog(false);
    setNavigateProfile(true);
  }
  return (
    <>
      <div className="flex flex-col w-screen break-words m-auto">
        <Header
          handleNavigatePost={handleNavigatePost}
          handleNavigateCreateBlog={handleNavigateCreateBlog}
          handleNavigateProfile={handleNavigateProfile}/>
        <div className="pt-12 text-center">
            {NavigatePost?<Post/>:NavigatePProfile?<Profile/>:<CreateBlog/>}
        </div>
      </div>
    </>
  );
};
export default Home;

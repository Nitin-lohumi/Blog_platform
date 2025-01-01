import React, { createContext, useEffect, useState } from "react";
import axois from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../AttributesPages/Header";
import CreateBlog from "./CreateBlog";
import Profile from "./Profile";
import Post from "./Post";
export const Context = createContext();
const Home = () => {
  const navigate = useNavigate();
  const [DataUser, setDataUser] = useState([]);
  const [NavigatePost, setNavigatePost] = useState(true);
  const [NavigateProfile, setNavigateCreatePost] = useState(false);
  const [activeHere,setActiveHere] = useState("post");
  const userData = async () => {
    try {
      const fetch = await axois.get("http://localhost:3000/auth/ShowUser", {
        withCredentials: true,
      });
      const res = fetch.data;
      setDataUser(res.user);
    } catch (error) {
      console.log(error);
      navigate("/auth/login");
    }
  };
  useEffect(() => {
    userData();
    navigate("/home/posts");
    setActiveHere("post");
  }, []);
  
  const handleNavigatePost = () => {
    setActiveHere("post");
    setNavigatePost(true);
    setNavigateCreatePost(false);
  };
  const handleNavigateCreateBlog = () => {
    setActiveHere("CreateBlog");
    setNavigatePost(false);
    setNavigateCreatePost(false);
  };
  // const handleNavigateProfile = () => {
  //   setNavigatePost(false);
  //   setNavigateCreatePost(true);
  // };
  return (
    <>
      <Context.Provider value={{ProfileData:DataUser}}>
      <div className="homepage w-full">
        <div className="Content max-w-screen">
          <Header
            activeHere={activeHere}
            handleNavigatePost={handleNavigatePost}
            handleNavigateCreateBlog={handleNavigateCreateBlog}
          />
          <div className="Container w-full border">
            <div className="Profile_container">
              <Profile />
            </div>
            <div className="pt-3 text-center Blog_Post">
              {NavigatePost ? <Post setNavigatePost={setNavigatePost} setNavigateProfile={setNavigateCreatePost}/> : 
                  <CreateBlog setNavigatePost={setNavigatePost} setNavigateCreatePost={setNavigateCreatePost}/>}
            </div>
          </div>
        </div>
      </div>
      </Context.Provider>
    </>
  );
};
export default Home;

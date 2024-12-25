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
  const [NavigatePProfile, setNavigateProfile] = useState(false);
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
  }, []);

  const handleNavigatePost = () => {
    setNavigatePost(true);
    setNavigateProfile(false);
  };
  const handleNavigateCreateBlog = () => {
    setNavigatePost(false);
    setNavigateProfile(false);
  };
  const handleNavigateProfile = () => {
    setNavigatePost(false);
    setNavigateProfile(true);
  };
  return (
    <>
      <Context.Provider value={{ProfileData:DataUser}}>
      <div className="homepage w-full">
        <div className="Content max-w-screen">
          <Header
            handleNavigatePost={handleNavigatePost}
            handleNavigateCreateBlog={handleNavigateCreateBlog}
          />
          <div className="Container w-full border">
            <div className="Profile_container">
              <Profile />
            </div>
            <div className="pt-3 text-center Blog_Post">
              {/* {NavigatePost ? <Post /> : <CreateBlog />} */}
              <CreateBlog/>
            </div>
          </div>
        </div>
      </div>
      </Context.Provider>
    </>
  );
};
export default Home;

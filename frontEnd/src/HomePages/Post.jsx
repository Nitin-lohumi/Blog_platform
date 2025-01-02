import React, { useEffect, useState } from "react";
import axios from "axios";
import { Context } from "./Home";
import { useContext } from "react";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import SinglePost from "../AttributesPages/SinglePost";
const Post = ({setPostIds,imageProfile,NavigateProfile,handleNavigateCreateBlog}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState(null);
  const [Nopost,setNoPost] = useState(false);
  const contextValue = useContext(Context);
  const fetchPosts = async () => {
    if(NavigateProfile){
     try {
      const res=  await axios.get(`http://localhost:3000/posts/OnlyUserPosts/${contextValue.ProfileData._id}`);
      const updatedPosts = res.data.posts.map((post) => ({
        ...post,
        isliked: post.likes.some(
          (like) => like.userId === contextValue.ProfileData._id
        ),
      }));
      setPosts(updatedPosts);
      setTimeout(()=>{
        setNoPost(updatedPosts.length===0); 
      },2000);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    }else{
    if (contextValue?.ProfileData?._id) {
      try {
        const res = await axios.get(
          `http://localhost:3000/posts/BlogPosts/${contextValue.ProfileData._id}`
        );
        const updatedPosts = res.data.map((post) => ({
          ...post,
          isliked: post.likes.some(
            (like) => like.userId === contextValue.ProfileData._id
          ),
        }));
        setPosts(updatedPosts);
        setTimeout(()=>{
          setNoPost(updatedPosts.length===0); 
        },2000);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  }
  };
  useEffect(() => {
    setLoading(true);
    fetchPosts();
  }, [contextValue.ProfileData,imageProfile]);

  const handleToggleDescription = (postId) => {
    setExpandedDescriptions(expandedDescriptions === postId ? null : postId);
  };

  const submitLike = async (postId) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/posts/BlogPost/like/${contextValue.ProfileData._id}`,
        { postId },
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.data) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  isliked: res.data.liked,
                  totalLikes: res.data.totalLikes,
                  likes: res.data.liked
                    ? [...post.likes, { _id: contextValue.ProfileData._id }]
                    : post.likes.filter(
                        (like) => like._id !== contextValue.ProfileData._id
                      ),
                }
              : post
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="UserSPost">
        {loading ? (
          <div className="h-96 flex justify-center items-center">
            <ReactLoading
              type={"spinningBubbles"}
              color={"green"}
              height={30}
              width={30}
            />
          </div>
        ) : posts.length ? (
          posts.map((p) => (
           <SinglePost p={p} setPostIds={setPostIds} key={p._id}
            handleToggleDescription={handleToggleDescription} 
            submitLike={submitLike}
            expandedDescriptions={expandedDescriptions}
            NavigateProfile={NavigateProfile}
            />
          ))
        ) :<div><p className="text-xl font-bold">NO POST YET....</p>{1?<div className="h-48 flex items-center justify-center">
            <Link onClick={handleNavigateCreateBlog} 
                to={"/home/CreateBlog"} ><button  className="text-xl p-6 font-semibold text-white bg-green-600 rounded-lg"> Create a BLOG POST</button></Link>
          </div>:""}</div>}
      </div>
    </>
  );
};

export default Post;

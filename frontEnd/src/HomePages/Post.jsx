import React, { useEffect, useState } from "react";
import { FaRegComment } from "react-icons/fa";
import axios from "axios";
import { Context } from "./Home";
import { useContext } from "react";
import ReactLoading from "react-loading";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import moment from 'moment';
const Post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState(null);
  const contextValue = useContext(Context);

  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
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
        } catch (error) {
          console.log(error);
        }
      }
      setLoading(false);
    };
    fetchPosts();
  }, [contextValue]);

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
            <div className="posts" key={p._id}>
              <div className="headerPost">
                <img
                  src={p.profile_picture}
                  alt="Image"
                  className="postProfileImage"
                />
                <div className="TitleName">
                  <h1>{p.posts_UserName}</h1>
                  <span>{p.title}</span>
                </div>
              </div>
              <div className="PostPhotoContainer">
                <img src={p.image} alt="PostImage" />
                <p className="liked_Details">
                  {p.isliked ? (
                    p.totalLikes > 1 ? (
                      <>
                       <div> Liked by <b> you </b> and  <b> {p.totalLikes - 1} </b> <b className="cursor-pointer">others</b></div>
                      </>
                    ) : p.totalLikes === 1 ? (
                       <p>liked by you.</p>
                    ) : (
                      ""
                    )
                  ) : p.totalLikes > 1 ? (
                    <>
                      Liked by <em>{p.likes[0].userName}</em> and{" "}
                      <b>{p.totalLikes - 1}</b> <b className="cursor-pointer">others</b>
                    </>
                  ) : p.totalLikes === 1 ? (
                    <>{p.likes[0].userName} likes this post</>
                  ) : (
                    ""
                  )}
                </p>
                <div className="likeCommentConatiner">
                  <button onClick={() => submitLike(p._id)}>
                    {p.isliked ? (
                      <FaHeart size={40} color="red" />
                    ) : (
                      <CiHeart size={40} color="black" />
                    )}
                  </button>
                  <button>
                    <FaRegComment size={40} color="black" />
                  </button>
                </div>
              </div>
              <div className="postDiscriptionContainer">
                <div className="discriptionsPost">
                  <div className="gap-3 text-gray-900 items-center">
                    <span className="inline font-thin userDiscription pl-2">
                      {p.posts_UserName}
                    </span>{" "}
                    {expandedDescriptions === p._id
                      ? p.description
                      : p.description.substring(0, 13)}
                    <span
                      className="cursor-pointer text-blue-700 pl-3"
                      onClick={() => handleToggleDescription(p._id)}
                    >
                      {expandedDescriptions === p._id ? "Show Less" : "...More"}
                    </span>
                  </div>
                </div>
                <div className="PostedTime">{"post uploded "+moment(p.createdAt).fromNow()}</div>
              </div>
            </div>
          ))
        ) : (
          <p>There are no posts here to show. Please create a post first.</p>
        )}
      </div>
    </>
  );
};

export default Post;

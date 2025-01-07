import { useEffect, useState, useContext } from "react";
import moment from "moment";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "axios";
import { Context } from "../HomePages/Home";

const CommentSection = ({ commentsSec, comment }) => {
  const values = useContext(Context);
  const [commentChange, setCommentsChange] = useState("");
  const [postComment, setPostComment] = useState(commentsSec || []);

  useEffect(() => {
    setPostComment(commentsSec);
  }, [commentsSec]);

  const handleChangeSend = async (postId) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/posts/BlogPost/comment/${values.ProfileData._id}`,
        { postId, text: commentChange }
      );

      const newComment = res.data.comment;
      setPostComment((prev) => [...prev, newComment]);
      setCommentsChange(""); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {postComment && postComment.length > 0 ? (
        postComment.map((v,index) => (
          <div
            className="flex items-baseline justify-between w-full border p-2 rounded-lg shadow-amber-200 shadow-sm"
            key={v._id||index}
          >
            <div className="inline flex-col text-justify text-gray-900">
              <h1 className="font-extrabold inline text-black pr-2">
                {v.userName}
              </h1>
              {v.text}
              <span className="pl-2 font-semibold text-sm text-gray-700">
                {" " + moment(v.createdAt).fromNow()}
              </span>
            </div>
            <div className="items-end">
              {v.userId === values.ProfileData._id ? (
                <button className="m-0 pl-5">
                  <RiDeleteBinLine />
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No comments yet</p>
      )}
      <div className="flex items-center justify-center gap-2  mt-3 p-1">
        <div className="w-full p-0">
          <input
            type="text"
            className="w-full p-2"
            placeholder="Send Comments..."
            value={commentChange}
            onChange={(e) => setCommentsChange(e.target.value)}
          />
        </div>
        <div>
          <button
            className="text-white p-2 bg-green-600 w-full"
            onClick={() => handleChangeSend(comment)}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default CommentSection;

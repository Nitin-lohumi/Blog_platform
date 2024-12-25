import React from "react";
const Header = ({handleNavigatePost,handleNavigateCreateBlog}) => {
  return (
    <>
        <div className="header">
          <div className="">
            <h1>BLOG PLATFROM</h1>
          </div>
          <ul className="headerList">
            <li onClick={handleNavigatePost} >post</li>
            <li onClick={handleNavigateCreateBlog}>Create Blog</li>
          </ul>
        </div>
    </>
  );
};
export default Header;

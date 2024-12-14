import React from "react";
const Header = ({handleNavigatePost,handleNavigateCreateBlog,handleNavigateProfile}) => {
  return (
    <>
        <div className="flex w-full max-w-full items-center justify-between overflow-x-auto header">
          <div className="w-full">
            <h1>BLOG PLATFROM</h1>
          </div>
          <ul className="flex list-none gap-4 h-fit break-words flex-shrink-0 headerList">
            <li onClick={handleNavigatePost} >post</li>
            <li onClick={handleNavigateCreateBlog}>Create Blog</li>
            <li onClick={handleNavigateProfile}>profile</li>
          </ul>
        </div>
    </>
  );
};
export default Header;

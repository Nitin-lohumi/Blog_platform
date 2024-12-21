import React, { useContext, useEffect, useRef, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import Image from "../AttributesPages/Image";
import Logout from "../LoginPages/Logout";
import { Context } from "./Home";
const Profile =()=>{
  const contextValue = useContext(Context);
  const [ClickMenu,SetClickMenu]= useState(false);
  const Menu = useRef();
  const ref1 = useRef();
  const ref2 = useRef();
  const [UploadImage,setUploadImage] = useState(false);
  const HandleOptionMenuClick =()=>{
    if(ClickMenu==true){
      SetClickMenu(false);
    }else{
       SetClickMenu(true);
    }
  }
  const handleClickOutside =(event)=>{
    if (Menu.current && event.target instanceof Node && !Menu.current.contains(event.target)
      && event.target instanceof Node && !ref1.current.contains(event.target) 
      && event.target instanceof Node && !ref2.current.contains(event.target)) 
    {
      SetClickMenu(false); 
    }
  }
  useEffect(()=>{
    if(UploadImage){
      handleSaveImage();
      setUploadImage(false);
    }
    document.addEventListener('click',handleClickOutside);
    return  () => {
      document.removeEventListener('click', handleClickOutside);
    };
  },[UploadImage]);
  const handleSaveImage =()=>{
     window.alert("sucess");
  }
  return (
    <>
     <div className="Profile_Div">
     <div className="MenuOptionDIV">
      <p onClick={HandleOptionMenuClick} ref={Menu} className="MenuOption"><CiMenuKebab/></p>
       <div className="OptionMenu" style={{display:ClickMenu?"block":"none"}}>
        <div ref={ref1}>Setting</div>
        <div ref={ref2}><Logout/></div>
       </div>
     </div>
     {/* contian the image from user  */}
     <div className="ContainerImage">
      <Image setUploadImage={setUploadImage}/>
     </div>
    {/* user info */} 
      <div className="UserInfo flex flex-col mt-2">
       <div className="flex flex-col p-2 border">
          <h1 className="text-center p-2">{contextValue.ProfileData.name}</h1>
          <p className="text-center p-3"><i className="font-thin text-wrap text-center">{contextValue.ProfileData.email}</i></p>
          
       </div>
      </div>
      {/* Setting */}
      <div className="flex w-full border justify-end items-center p-4">
      <p>{" logout -"}</p> <Logout logoutname={"logout -"} bg={"red"}/>
      </div>
     </div>

    </>
  )
}
export default Profile;
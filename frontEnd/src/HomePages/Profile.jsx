import React, { useContext, useEffect, useRef, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import Image from "../AttributesPages/Image";
import Logout from "../LoginPages/Logout";
import { Context } from "./Home";
import axios from "axios";
import imageCompression from "browser-image-compression";
const Profile =()=>{
  const [load,setLoad]= useState(false);
  const contextValue = useContext(Context);
  const [ClickMenu,SetClickMenu]= useState(false);
  const Menu = useRef();
  const ref1 = useRef();
  const ref2 = useRef();
  const [base64Data, setBase64Data] = useState("");
  const [image,setImage] =useState(null);

  const HandleOptionMenuClick =()=>{
    if(ClickMenu==true){
      SetClickMenu(false);
    }else{
       SetClickMenu(true);
    }
  }
  const handleClickOutside =(event)=>{
    if (!Menu.current) 
    {
      SetClickMenu(false); 
    }
  }
  useEffect(()=>{
    document.addEventListener('click',handleClickOutside);
    return  () => {
      document.removeEventListener('click', handleClickOutside);
    };
  },[]);

  const handleImageInput =async (event) => {
    const file = event.target.files[0];
    if (file) {
      try{
        const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 600,
      });
      const reader = new FileReader(); 
      reader.onloadend = () => {
        setBase64Data(reader.result); 
        const confirmUpload = window.confirm("Are you sure you want to upload this image?");
        if (confirmUpload) {
          handleSaveImage(reader.result); 
        } else {
          setBase64Data(""); 
        }
      };
      reader.readAsDataURL(compressedFile); 
    }catch(error){

    }
    }
  };
  useEffect(()=>{
    setImage(base64Data);
  },[setBase64Data,base64Data]);

  const handleSaveImage = async(imageurl)=>{
      try {
        setLoad(true);
        console.log(contextValue.ProfileData._id);
        const url =await axios.post(`http://localhost:3000/upload/Profile/${contextValue.ProfileData._id}`,{image:imageurl});
        console.log(url);
        setLoad(false);
      } catch (error) {
        
      }
    }
  return (
    <>
     <div className="Profile_Div">
     <div className="MenuOptionDIV">
      <p onClick={HandleOptionMenuClick} ref={Menu} className="MenuOption"><CiMenuKebab/></p>
       <div className="OptionMenu" style={{display:ClickMenu?"block":"none"}}>
        {/* <div ref={ref1}>Setting</div> */}
        <div ref={ref2}><Logout/></div>
       </div>
     </div>
     {/* contian the image from user  */}
     <div className="ContainerImage">
      <Image 
      base64Data={base64Data}
       handleImageInput={handleImageInput}
       load={load}
       />
     </div>
    {/* user info */} 
      <div className="UserInfo flex flex-col mt-2">
       <div className="flex flex-col p-2 border">
          <h1 className="text-center p-2">{contextValue.ProfileData.name}</h1>
          <p className="text-center p-3"><i className="font-thin text-wrap text-center">{contextValue.ProfileData.email}</i>
          </p>
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
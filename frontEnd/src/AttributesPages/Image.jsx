import { useState } from "react";
import { AiTwotoneEdit } from "react-icons/ai";
import { useContext } from "react";
import { Context } from "../HomePages/Home";
const Image = ({ setUploadImage }) => {
  const valueContext = useContext(Context);
  const DBImage = valueContext.ProfileData.picture;
  const [Image, setImage] = useState("");
  const handleImageInput = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(event.target.files[0]);
      const reader = new FileReader();
      const confirm = window.confirm("Sure! you wanna uppload this image !");
      if (confirm) {
        reader.onloadend = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(file);
        setUploadImage(true);
      } else {
        setUploadImage(false);
      }
    } else {
      setImage("");
      setUploadImage(false);
    }
  };
  return (
    <>
      {DBImage&&<div>
        <img
        src={Image?Image:DBImage?DBImage:"img.jpg"}
          alt="ProfileImage"
          className="ProfileImage"
        />
        <label htmlFor="imgFile" className="ChooseImage bg-black/5">
          {" "}
          <AiTwotoneEdit size={40} />
        </label>
        <input
          type="file"
          id="imgFile"
          accept="image/jpeg, image/png, image/jpg"
          hidden
          onChange={handleImageInput}
        />
      </div>}
    </>
  );
};
export default Image;

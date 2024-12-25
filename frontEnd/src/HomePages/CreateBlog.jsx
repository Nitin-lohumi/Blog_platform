import React from "react";
import { styled } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
const CreateBlog = () => {
  return (
    <>
      <div className="createBlog">
        <div className="createBlog_header">
          <h1>
            <span>CREATE</span> YOUR OWN BLOG.
          </h1>
          <p>THIS IS YOUR PLATFROM </p>
          <p>Make it. Live it</p>
        </div>
        <div className="createBlog_create_container">
          <TextField
            label="title"
            variant="outlined"
            fullWidth
            className="postTitle"
          />
          <TextField
            label="Discription"
            multiline
            rows={3}
            variant="outlined"
            fullWidth
            className="discription"
          />
          <div className="PostImage">
            <img src="img.jpg" alt="postImage" className="imageOfPost"/>
          </div>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
          >
            Upload files
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => console.log(event.target.files)}
              multiple
            />
          </Button>
          <div>
            
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateBlog;
